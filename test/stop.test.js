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

test(`doesn't reprint stop message`, () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #stop\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠸\x1B[39m #stop\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m #stop\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('stops after 2 spins and prints stop message', () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.stop({ text: 'Done!' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #stop\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m Done!\n' +
    '\x1B[?25h'
  let snapCI = '\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m Done!\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as stop with mark', () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop({ mark: 'V', color: 'magenta' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #stop\x1B[1G\x1B[2K\x1B[1G\x1B[35mV\x1B[39m #stop\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m #stop\n\x1B[33m-\x1B[39m #stop\n\x1B[35mV\x1B[39m #stop\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('stop supports string', () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop('replace stop text')

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #stop\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠸\x1B[39m #stop\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠼\x1B[39m replace stop text\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #stop\n' +
    '\x1B[33m-\x1B[39m #stop\n' +
    '\x1B[33m-\x1B[39m #stop\n' +
    '\x1B[33m-\x1B[39m #stop\n' +
    '\x1B[33m-\x1B[39m replace stop text\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
