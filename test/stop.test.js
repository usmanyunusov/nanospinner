let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it(`doesn't reprint stop message`, () => {
  stdout.out = ''
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop()

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it('stops after 2 spins and prints stop message', () => {
  stdout.out = ''
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.stop({ text: 'Done!' })

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})

it('marks spinner as stop with mark', () => {
  stdout.out = ''
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop({ mark: 'V' })

  expect(stdout.out).toMatchSnapshot(process.env.CI ? 'CI' : 'Local')
})
