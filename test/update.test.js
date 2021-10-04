delete process.env.CI

let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('uses custom frames', () => {
  let spinner = createSpinner('#update', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.update({ frames: ['.', 'o', '0', '@', '*'], text: 'Change update' })
  spinner.spin()
  spinner.spin()
  spinner.spin()

  expect(stdout.out).toMatchSnapshot()
})
