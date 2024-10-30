let { test } = require('uvu')
let { is } = require('uvu/assert')

let { createSpinner } = require('../dist/index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

test.before.each(() => {
  stdout.out = ''
})

test('spins default frames', () => {
  let spinner = createSpinner('', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠸\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠼\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠴\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠦\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠧\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠇\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠏\x1B[39m '
  let snapCI =
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('spins defult frames if new ones have no elements', () => {
  let spinner = createSpinner('', { stream: stdout, frames: [] })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠸\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠼\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠴\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠦\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠧\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠇\x1B[39m \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠏\x1B[39m '
  let snapCI =
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n' +
    '\x1B[33m-\x1B[39m \n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
