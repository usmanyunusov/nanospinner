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

test(`marks spinner as clear`, () => {
  let spinner = createSpinner('#clear', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.clear()
  stdout.write('console.log()')

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #clear\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #clear\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #clear\x1B[1G\x1B[2K\x1B[1Gconsole.log()'
  let snapCI =
    '\x1B[33m-\x1B[39m #clear\n\x1B[33m-\x1B[39m #clear\n\x1B[33m-\x1B[39m #clear\n\x1B[1Gconsole.log()'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
