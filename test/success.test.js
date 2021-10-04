delete process.env.CI

let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('marks spinner as success', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success()

  expect(stdout.out).toMatchSnapshot()
})

it('marks spinner as success with message', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ text: 'Successful\n' })

  expect(stdout.out).toMatchSnapshot()
})

it('marks spinner as success with mark', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ mark: 'V' })

  expect(stdout.out).toMatchSnapshot()
})
