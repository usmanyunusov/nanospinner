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

test('marks spinner as error', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #error\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #error\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #error\x1B[1G\x1B[2K\x1B[1G\x1B[31m✖\x1B[39m #error\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #error\n' +
    '\x1B[33m-\x1B[39m #error\n' +
    '\x1B[33m-\x1B[39m #error\n' +
    '\x1B[31m✖\x1B[39m #error\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as error with message', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error({ text: 'Error' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #error\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #error\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #error\x1B[1G\x1B[2K\x1B[1G\x1B[31m✖\x1B[39m Error\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #error\n' +
    '\x1B[33m-\x1B[39m #error\n' +
    '\x1B[33m-\x1B[39m #error\n' +
    '\x1B[31m✖\x1B[39m Error\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as error with mark', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error({ mark: '!' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #error\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #error\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #error\x1B[1G\x1B[2K\x1B[1G! #error\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #error\n\x1B[33m-\x1B[39m #error\n\x1B[33m-\x1B[39m #error\n! #error\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
