import { createSpinner } from '../index.js'

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('marks spinner as error', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error()

  expect(stdout.out).toMatchSnapshot()
})

it('marks spinner as error with message', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ text: 'Error\n' })

  expect(stdout.out).toMatchSnapshot()
})

it('marks spinner as error with mark', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ mark: '!' })

  expect(stdout.out).toMatchSnapshot()
})
