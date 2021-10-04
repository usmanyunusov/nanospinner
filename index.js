let { green, red, yellow } = require('picocolors')
let { isTTY, symbols } = require('./consts.js')

function createSpinner(text = '', opts = {}) {
  let current = 0,
    interval = opts.interval || 25,
    stream = opts.stream || process.stderr,
    frames = opts.frames || symbols.frames,
    state = 'stopped',
    timer

  let spinner = {
    reset() {
      current = 0
      timer = null
      state = 'stopped'
    },

    write(str, clear = false) {
      if (!isTTY) return

      clear && stream.write(`\x1b[1G`)
      stream.write(`${str}`)
      return spinner
    },

    render() {
      let str = `${yellow(frames[current])} ${text}`
      isTTY && spinner.write(`\x1b[?25l`)
      spinner.write(str, true)
    },

    spin() {
      spinner.render()
      current = (current + 1) % frames.length
      state = 'spinning'
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
      timer = setTimeout(() => spinner.loop(), interval)
    },

    start() {
      spinner.reset()
      spinner.loop()
      return spinner
    },

    stop(opts = {}) {
      let mark = opts.mark || yellow(frames[current])

      spinner.update({ text: opts.text || text })
      spinner.write(`\x1b[2K\x1b[1G`)
      spinner.write(`${mark} ${text}\n`)

      isTTY && spinner.write(`\x1b[?25h`)
      clearTimeout(timer)
      state = 'stopped'
      return spinner
    },

    success(opts = {}) {
      return spinner.stop({ ...opts, mark: green(symbols.tick) })
    },

    error(opts = {}) {
      return spinner.stop({ ...opts, mark: red(symbols.cross) })
    }
  }

  return spinner
}

module.exports = {
  createSpinner
}
