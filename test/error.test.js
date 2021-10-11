let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it('marks spinner as error', () => {
  stdout.out = ''
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error()

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it('marks spinner as error with message', () => {
  stdout.out = ''
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error({ text: 'Error' })

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it('marks spinner as error with mark', () => {
  stdout.out = ''
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error({ mark: '!' })

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})
