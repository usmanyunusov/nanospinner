let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it(`marks spinner as write`, () => {
  stdout.out = ''
  let spinner = createSpinner('#write', { stream: stdout })

  spinner.write('Write text')

  let snapLocal = `"Write text"`
  let snapCI = `"Write text"`
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it(`marks spinner as write whit clear`, () => {
  stdout.out = ''
  let spinner = createSpinner('#write', { stream: stdout })

  spinner.write('Write text', true)

  let snapLocal = `"[1GWrite text"`
  let snapCI = `"Write text"`
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
