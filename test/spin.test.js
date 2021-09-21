import { createSpinner } from '../index.js'

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('spins default frames', () => {
  let spinner = createSpinner('', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()

  expect(stdout.out).toMatchSnapshot()
})
