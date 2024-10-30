import type { Colors } from 'picocolors/types'
import pc from 'picocolors'
import { isTTY, symbols } from './consts'

type Color = keyof Omit<Colors, 'isColorSupported'>

interface Options {
  stream?: NodeJS.WriteStream
  frames?: string[]
  interval?: number
  text?: string
  color?: Color
}

interface Spinner {
  success(opts?: { text?: string; mark?: string; update?: boolean } | string): Spinner
  error(opts?: { text?: string; mark?: string; update?: boolean } | string): Spinner
  warn(opts?: { text?: string; mark?: string; update?: boolean } | string): Spinner
  info(opts?: { text?: string; mark?: string; update?: boolean } | string): Spinner
  stop(opts?: { text?: string; mark?: string; color?: Color; update?: boolean } | string): Spinner
  start(opts?: { text?: string; color?: Color } | string): Spinner
  update(opts: Options | string): Spinner
  reset(): Spinner
  clear(): Spinner
  spin(): Spinner
  write(str: string, clear?: boolean): Spinner
  render(): Spinner
  loop(): Spinner
  isSpinning(): boolean
}

function getLines(str = '', width = 80) {
  return str
    .replace(/\u001b[^m]*?m/g, '')
    .split('\n')
    .reduce((col, line) => (col += Math.max(1, Math.ceil(line.length / width))), 0)
}

export function createSpinner(text = '', opts: Options = {}) {
  let current = 0,
    interval = opts.interval || 50,
    stream = opts.stream || process.stderr,
    frames = opts.frames && opts.frames.length ? opts.frames : symbols.frames,
    color: Color = opts.color || 'yellow',
    spinning = false,
    lines = 0,
    timer: NodeJS.Timeout,
    getText = (opts: string | { text?: string } = {}) =>
      typeof opts === 'string' ? opts : opts.text || text,
    getUpdate = (opts: string | { update?: boolean } = {}) =>
      typeof opts === 'string' ? false : !!opts.update,
    getColor = (opts: string | { color?: Color } = {}) =>
      typeof opts === 'string' || !opts.color ? color : opts.color,
    getMark = (opts: string | { mark?: string } = {}, fallback: string) =>
      typeof opts === 'string' || !opts.mark ? fallback : opts.mark,
    mountProcessEvents = () => {
      process.on('SIGINT', exit)
      process.on('SIGTERM', exit)
    },
    cleanupProcessEvents = () => {
      process.off('SIGINT', exit)
      process.off('SIGTERM', exit)
    }

  let spinner: Spinner = {
    reset() {
      current = 0
      lines = 0
      spinning = false
      clearTimeout(timer)
      return spinner
    },

    clear() {
      spinner.write('\x1b[1G')
      for (let i = 0; i < lines; i++) {
        i > 0 && spinner.write('\x1b[1A')
        spinner.write('\x1b[2K\x1b[1G')
      }
      lines = 0

      return spinner
    },

    write(str: string, clear = false) {
      if (clear && isTTY) spinner.clear()
      stream.write(str)
      return spinner
    },

    render() {
      let str = `${pc[color](frames[current])} ${text}`
      isTTY ? spinner.write(`\x1b[?25l`) : (str += '\n')
      spinner.write(str, true)
      isTTY && (lines = getLines(str, stream.columns))
      return spinner
    },

    spin() {
      spinner.render()
      current = ++current % frames.length
      return spinner
    },

    update(opts) {
      if (typeof opts === 'string') {
        text = opts
      } else {
        text = opts.text || text
        frames = opts.frames && opts.frames.length ? opts.frames : frames
        interval = opts.interval || interval
        color = opts.color || color
      }

      if (frames.length - 1 < current) current = 0
      return spinner
    },

    loop() {
      isTTY && (timer = setTimeout(() => spinner.loop(), interval))
      return spinner.spin()
    },

    start(opts = {}) {
      spinning = true
      timer && spinner.reset()
      mountProcessEvents()
      return spinner.update({ text: getText(opts), color: getColor(opts) }).loop()
    },

    stop(opts = {}) {
      spinning = false

      clearTimeout(timer)
      cleanupProcessEvents()

      const mark = pc[getColor(opts)](getMark(opts, frames[current]))
      const text = getText(opts)
      const update = getUpdate(opts)

      spinner.write(`${mark} ${text}${update ? '' : '\n'}`, true)
      return isTTY && !update ? spinner.write(`\x1b[?25h`) : spinner
    },

    success(opts = {}) {
      return spinner.stop({
        text: getText(opts),
        mark: getMark(opts, symbols.tick),
        color: 'green',
        update: getUpdate(opts),
      })
    },

    error(opts = {}) {
      return spinner.stop({
        text: getText(opts),
        mark: getMark(opts, symbols.cross),
        color: 'red',
        update: getUpdate(opts),
      })
    },

    warn(opts = {}) {
      return spinner.stop({
        text: getText(opts),
        mark: getMark(opts, symbols.warn),
        color: 'yellow',
        update: getUpdate(opts),
      })
    },

    info(opts = {}) {
      return spinner.stop({
        text: getText(opts),
        mark: getMark(opts, symbols.info),
        color: 'blue',
        update: getUpdate(opts),
      })
    },

    isSpinning() {
      return spinning
    },
  }

  function exit(signal: NodeJS.Signals) {
    if (spinning) {
      spinner.stop()
    }

    process.exit(signal === 'SIGINT' ? 130 : signal === 'SIGTERM' ? 143 : 1)
  }

  return spinner
}
