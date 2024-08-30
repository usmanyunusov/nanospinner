/**
 * This file contains code adapted from the following projects:
 *
 * 1. is-unicode-supported (https://github.com/sindresorhus/is-unicode-supported)
 * 2. cli-spinners (https://github.com/sindresorhus/cli-spinners)
 * 3. log-symbols (https://github.com/sindresorhus/log-symbols)
 *
 * All of the above projects are created by Sindre Sorhus (https://sindresorhus.com)
 * and are licensed under the MIT License.
 *
 * The full text of the MIT License can be found in the LICENSE file in this project's root directory.
 */

const tty = require('tty')

// Adapted from is-unicode-supported
const isCI =
  process.env.CI ||
  process.env.WT_SESSION ||
  process.env.ConEmuTask === '{cmd::Cmder}' ||
  process.env.TERM_PROGRAM === 'vscode' ||
  process.env.TERM === 'xterm-256color' ||
  process.env.TERM === 'alacritty'
const isTTY = tty.isatty(1) && process.env.TERM !== 'dumb' && !('CI' in process.env)
const supportUnicode = process.platform !== 'win32' ? process.env.TERM !== 'linux' : isCI

const symbols = {
  // Adapted from cli-spinners
  frames: isTTY
    ? supportUnicode
      ? ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
      : ['-', '\\', '|', '/']
    : ['-'],
  // Adapted from log-symbols
  tick: supportUnicode ? '✔' : '√',
  cross: supportUnicode ? '✖' : '×',
  warn: supportUnicode ? '⚠' : '!!',
}

module.exports = { isTTY, symbols }
