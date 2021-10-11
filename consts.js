const tty = require('tty')

const isCI =
  process.env.CI ||
  process.env.WT_SESSION ||
  process.env.ConEmuTask === '{cmd::Cmder}' ||
  process.env.TERM_PROGRAM === 'vscode' ||
  process.env.TERM === 'xterm-256color' ||
  process.env.TERM === 'alacritty'
const isTTY = tty.isatty(1) && process.env.TERM !== 'dumb' && !('CI' in process.env)
const isUTFSupport = process.platform !== 'win32' ? process.env.TERM !== 'linux' : isCI
const symbols = {
  frames: isTTY
    ? isUTFSupport
      ? ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
      : ['-', '\\', '|', '/']
    : ['-'],
  tick: isUTFSupport ? '✔' : '√',
  cross: isUTFSupport ? '✖' : '×',
}

function getLines(str, maxWidth = 80) {
  return Math.ceil(str.replace(/\u001b[^m]*?m/g, '').length / maxWidth)
}

module.exports = { isTTY, symbols, getLines }
