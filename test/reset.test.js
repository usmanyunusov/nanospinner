delete process.env.CI

let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it(`spins default frames`, () => {
  let spinner = createSpinner('#reset', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.reset()
  spinner.spin()
  spinner.spin()

  expect(stdout.out).toMatchSnapshot()
})
