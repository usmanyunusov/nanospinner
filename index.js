let { green, red, yellow } = require('picocolors')
let { isTTY, symbols } = require('./consts.js')

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
      clear && stream.write(`\x1b[1G`)
      stream.write(`${str}`)
      return spinner
    },

    render() {
      let str = `${yellow(frames[current])} ${text}`
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
      if (timer) spinner.reset()
      spinner.update({ text: opts.text || text }).loop()
      return spinner
    },

    stop(opts = {}) {
      opts.mark = opts.mark || yellow(frames[current])
      timer = clearTimeout(timer)
      spinner
        .update({ text: opts.text || text })
        .write(`\x1b[2K\x1b[1G`)
        .write(`${opts.mark} ${text}\n`)
      isTTY && stream.write(`\x1b[?25h`)
      return spinner
    },

    success(opts = {}) {
      return spinner.stop({ mark: green(symbols.tick), ...opts })
    },

    error(opts = {}) {
      return spinner.stop({ mark: red(symbols.cross), ...opts })
    },
  }

  return spinner
}

module.exports = {
  createSpinner,
}
