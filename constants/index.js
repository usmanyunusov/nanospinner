import tty from 'tty'

const isWindow = process.platform === 'win32'
const isLinux = process.env.TERM === 'linux'
const isCI =
  process.env.CI ||
  process.env.WT_SESSION ||
  process.env.ConEmuTask === '{cmd::Cmder}' ||
  process.env.TERM_PROGRAM === 'vscode' ||
  process.env.TERM === 'xterm-256color' ||
  process.env.TERM === 'alacritty'
const isTTY = tty.isatty(1) && process.env.TERM !== 'dumb' && !process.env.CI

const isUnicodSupport = !isWindow ? !isLinux : isCI
const symbols = {
  frames: isTTY
    ? isUnicodSupport
      ? ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
      : ['-', '\\', '|', '/']
    : ['-'],
  tick: isUnicodSupport ? '✔' : '√',
  cross: isUnicodSupport ? '✖' : '×'
}

export { isTTY, symbols }
