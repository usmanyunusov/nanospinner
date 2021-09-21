import { createSpinner } from '../index.js'

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('uses custom frames', () => {
  let spinner = createSpinner('', { stream: stdout })
  spinner.frames = ['.', 'o', '0', '@', '*']

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()

  expect(stdout.out).toMatchSnapshot()
})
