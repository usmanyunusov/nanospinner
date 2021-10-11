let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it('marks spinner as success', () => {
  stdout.out = ''
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success()

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it('marks spinner as success with message', () => {
  stdout.out = ''
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ text: 'Successful' })

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it('marks spinner as success with mark', () => {
  stdout.out = ''
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ mark: 'V' })

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})
