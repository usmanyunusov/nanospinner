let { test } = require('uvu')
let { is } = require('uvu/assert')

let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

test.before.each(() => {
  stdout.out = ''
})

test('marks spinner as warn', () => {
  let spinner = createSpinner('#warn', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.warn()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #warn\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #warn\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #warn\x1B[1G\x1B[2K\x1B[1G\x1B[33m⚠\x1B[39m #warn\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #warn\n' +
    '\x1B[33m-\x1B[39m #warn\n' +
    '\x1B[33m-\x1B[39m #warn\n' +
    '\x1B[33m⚠\x1B[39m #warn\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as warn with message', () => {
  let spinner = createSpinner('#warn', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.warn({ text: 'Successful' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #warn\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #warn\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #warn\x1B[1G\x1B[2K\x1B[1G\x1B[33m⚠\x1B[39m Successful\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #warn\n' +
    '\x1B[33m-\x1B[39m #warn\n' +
    '\x1B[33m-\x1B[39m #warn\n' +
    '\x1B[33m⚠\x1B[39m Successful\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as warn with mark', () => {
  let spinner = createSpinner('#warn', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.warn({ mark: 'V' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #warn\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #warn\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #warn\x1B[1G\x1B[2K\x1B[1GV #warn\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #warn\n\x1B[33m-\x1B[39m #warn\n\x1B[33m-\x1B[39m #warn\nV #warn\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
