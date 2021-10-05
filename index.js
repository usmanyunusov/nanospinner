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
      timer = null
    },

    write(str, clear = false) {
      clear && stream.write(`\x1b[1G`)
      stream.write(`${str}`)
      return spinner
    },

    render() {
      let str = `${yellow(frames[current])} ${text}`
      isTTY ? spinner.write(`\x1b[?25l`) : (str += '\n')
      spinner.write(str, true)
    },

    spin() {
      spinner.render()
      current = ++current % frames.length
      return spinner
    },

    update(opts = {}) {
      opts.text && (text = opts.text)
      opts.frames && (frames = opts.frames)
      opts.interval && (interval = opts.interval)
      return spinner
    },

    loop() {
      spinner.spin()
      timer = setTimeout(() => isTTY && spinner.loop(), interval)
    },

    start() {
      if (timer) return spinner

      spinner.reset()
      spinner.loop()

      process.on('SIGINT', () => {
        spinner.stop()
        process.exit()
      })

      return spinner
    },

    stop(opts = {}) {
      let mark = opts.mark || yellow(frames[current])

      timer = clearTimeout(timer)
      spinner.update({ text: opts.text || text })
      spinner.write(`\x1b[2K\x1b[1G`)
      spinner.write(`${mark} ${text}\n`)
      isTTY && spinner.write(`\x1b[?25h`)
      return spinner
    },

    success(opts = {}) {
      return spinner.stop({ mark: green(symbols.tick), ...opts })
    },

    error(opts = {}) {
      return spinner.stop({ mark: red(symbols.cross), ...opts })
    }
  }

  return spinner
}

module.exports = {
  createSpinner
}
