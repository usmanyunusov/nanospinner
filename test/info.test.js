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

test('marks spinner as info', () => {
  let spinner = createSpinner('#info', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.info()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #info\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #info\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #info\x1B[1G\x1B[2K\x1B[1G\x1B[34mℹ\x1B[39m #info\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #info\n' +
    '\x1B[33m-\x1B[39m #info\n' +
    '\x1B[33m-\x1B[39m #info\n' +
    '\x1B[34mℹ\x1B[39m #info\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as info with message', () => {
  let spinner = createSpinner('#info', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.info({ text: 'Information' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #info\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #info\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #info\x1B[1G\x1B[2K\x1B[1G\x1B[34mℹ\x1B[39m Information\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #info\n' +
    '\x1B[33m-\x1B[39m #info\n' +
    '\x1B[33m-\x1B[39m #info\n' +
    '\x1B[34mℹ\x1B[39m Information\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('marks spinner as info with mark', () => {
  let spinner = createSpinner('#info', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.info({ mark: 'ii' })

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #info\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #info\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #info\x1B[1G\x1B[2K\x1B[1Gii #info\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m #info\n\x1B[33m-\x1B[39m #info\n\x1B[33m-\x1B[39m #info\nii #info\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
