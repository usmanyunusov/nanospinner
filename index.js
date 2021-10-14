const { green, red, yellow } = require('picocolors')
const { isTTY, symbols } = require('./consts')

function getLines(str = '', width = 80) {
  return str
    .replace(/\u001b[^m]*?m/g, '')
    .split('\n')
    .reduce((col, line) => (col += Math.max(1, Math.ceil(line.length / width))), 0)
}

function createSpinner(text = '', opts = {}) {
  let current = 0,
    interval = opts.interval || 25,
    stream = opts.stream || process.stderr,
    frames = opts.frames || symbols.frames,
    lines = 0,
    timer

  let spinner = {
    reset() {
      current = 0
      lines = 0
      timer = clearTimeout(timer)
    },

    write(str, clear = false) {
      if (clear && isTTY) {
        spinner.write('\x1b[1G')
        for (let i = 0; i < lines; i++) {
          i > 0 && spinner.write('\x1b[1A')
          spinner.write('\x1b[2K\x1b[1G')
        }
        lines = 0
      }

      stream.write(str)
      return spinner
    },

    render() {
      let mark = yellow(frames[current])
      let str = `${mark} ${text}`
      isTTY ? spinner.write(`\x1b[?25l`) : (str += '\n')
      spinner.write(str, true)
      isTTY && (lines = getLines(str, stream.columns))
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
      isTTY && (timer = setTimeout(() => spinner.loop(), interval))
      return spinner.spin()
    },

    start(opts = {}) {
      timer && spinner.reset()
      return spinner.update({ text: opts.text }).loop()
    },

    stop(opts = {}) {
      timer = clearTimeout(timer)

      let mark = yellow(frames[current])
      spinner.write(`${opts.mark || mark} ${opts.text || text}\n`, true)

      return isTTY ? spinner.write(`\x1b[?25h`) : spinner
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
