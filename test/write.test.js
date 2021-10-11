let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it(`marks spinner as write`, () => {
  stdout.out = ''
  let spinner = createSpinner('#write', { stream: stdout })

  spinner.write('Write text')

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it(`marks spinner as write whit clear`, () => {
  stdout.out = ''
  let spinner = createSpinner('#write', { stream: stdout })

  spinner.write('Write text', true)

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})
