const { green, red, yellow } = require('picocolors')
const { isTTY, symbols } = require('./constants')

function createSpinner(text = '', opts = {}) {
  let current = 0,
    interval = opts.interval || 25,
    stream = opts.stream || process.stderr,
    frames = opts.frames || symbols.frames,
    timer

  let spinner = {
    reset() {
      current = 0
      timer = clearTimeout(timer)
    },

    write(str, clear = false) {
      stream.write(clear ? `\x1b[1G${str}` : str)
      return spinner
    },

    render() {
      let mark = yellow(frames[current])
      let str = `${mark} ${text}`
      isTTY ? stream.write(`\x1b[?25l`) : (str += '\n')
      spinner.write(str, true)
    },

    spin() {
      spinner.render()
      current = ++current % frames.length
      return spinner
    },

    update(opts = {}) {
      text = opts.text || text
      frames = opts.frames || frames
      interval = opts.interval || interval
      return spinner
    },

    loop() {
      spinner.spin()
      isTTY && (timer = setTimeout(() => spinner.loop(), interval))
    },

    start(opts = {}) {
      timer && spinner.reset()
      spinner.update({ text: opts.text || text }).loop()
      return spinner
    },

    stop(opts = {}) {
      let mark = yellow(frames[current])
      timer = clearTimeout(timer)
      spinner.write(`\x1b[2K\x1b[1G`)
      spinner.write(`${opts.mark || mark} ${opts.text || text}\n`)
      isTTY && stream.write(`\x1b[?25h`)
      return spinner
    },

    success(opts = {}) {
      let mark = green(symbols.tick)
      return spinner.stop({ mark, ...opts })
    },

    error(opts = {}) {
      let mark = red(symbols.cross)
      return spinner.stop({ mark, ...opts })
    },
  }

  return spinner
}

module.exports = {
  createSpinner,
}
