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

test('marks spinner as success', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #success\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #success\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #success\x1B[1G\x1B[2K\x1B[1G\x1B[32m✔\x1B[39m #success\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #success\n' +
    '\x1B[33m-\x1B[39m #success\n' +
    '\x1B[33m-\x1B[39m #success\n' +
    '\x1B[32m✔\x1B[39m #success\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as success with message', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ text: 'Successful' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #success\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #success\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #success\x1B[1G\x1B[2K\x1B[1G\x1B[32m✔\x1B[39m Successful\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #success\n' +
    '\x1B[33m-\x1B[39m #success\n' +
    '\x1B[33m-\x1B[39m #success\n' +
    '\x1B[32m✔\x1B[39m Successful\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as success with mark', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ mark: 'V' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #success\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #success\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #success\x1B[1G\x1B[2K\x1B[1GV #success\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #success\n\x1B[33m-\x1B[39m #success\n\x1B[33m-\x1B[39m #success\nV #success\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
