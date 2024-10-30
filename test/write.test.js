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

test(`marks spinner as write`, () => {
  createSpinner('#write', { stream: stdout }).write('Write text')

  let snapLocal = 'Write text'
  let snapCI = 'Write text'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test(`marks spinner as write whit clear`, () => {
  createSpinner('#write', { stream: stdout }).write('Write text', true)

  let snapLocal = '\x1B[1GWrite text'
  let snapCI = 'Write text'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
