delete process.env.CI

let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it(`doesn't reprint stop message`, () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop()

  expect(stdout.out).toMatchSnapshot()
})

it('stops after 2 spins and prints stop message', () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.stop({ text: 'Done!\n' })

  expect(stdout.out).toMatchSnapshot()
})
