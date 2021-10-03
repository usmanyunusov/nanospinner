const { green, red, yellow } = require('nanocolors')
const { isTTY, symbols } = require('../constants/index.cjs')

function createSpinner(text = '', opts = {}) {
  let { stream = process.stderr } = opts
  let current = 0,
    timer

  let spinner = {
    text,
    isTTY,
    state: 'stopped',
    frames: opts.frames || symbols.frames,
    interval: opts.interval || 25,

    reset() {
      current = 0
      timer = null
      spinner.state = 'stopped'
    },

    write(str, clear = false) {
      if (!isTTY) return

      clear && stream.write(`\x1b[1G`)
      stream.write(`${str}`)
      return spinner
    },

    render() {
      let frame = spinner.frames[current]
      let str = `${yellow(frame)} ${spinner.text}`
      spinner.isTTY && spinner.write(`\x1b[?25l`)
      spinner.write(str, true)
    },

    spin() {
      spinner.render()
      current = (current + 1) % spinner.frames.length
      spinner.state = 'spinning'
      return spinner
    },

    loop() {
      spinner.spin()
      timer = setTimeout(() => spinner.loop(), spinner.interval)
    },

    start() {
      spinner.reset()
      spinner.loop()
      return spinner
    },

    stop(opts = {}) {
      let frame = spinner.frames[current]
      let { mark = yellow(frame), text = spinner.text } = opts

      spinner.write(`\x1b[2K\x1b[1G`)
      spinner.write(`${mark} ${text}\n`)
      spinner.isTTY && spinner.write(`\x1b[?25h`)
      clearTimeout(timer)
      spinner.state = 'stopped'
      return spinner
    },

    success(opts) {
      return spinner.stop({ ...opts, mark: green(symbols.tick) })
    },

    error(opts) {
      return spinner.stop({ ...opts, mark: red(symbols.cross) })
    }
  }

  return spinner
}

module.exports = { createSpinner }
