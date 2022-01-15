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

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #stop[?25l[1G[2K[1G[33m⠙[39m #stop[?25l[1G[2K[1G[33m⠹[39m #stop[1G[2K[1G[33m⠸[39m #stop
    [?25h"
  `
  let snapCI = `
    "[33m-[39m #stop
    [33m-[39m #stop
    [33m-[39m #stop
    [33m-[39m #stop
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('stops after 2 spins and prints stop message', () => {
  stdout.out = ''
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.stop({ text: 'Done!' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #stop[?25l[1G[2K[1G[33m⠙[39m #stop[1G[2K[1G[33m⠹[39m Done!
    [?25h"
  `
  let snapCI = `
    "[33m-[39m #stop
    [33m-[39m #stop
    [33m-[39m Done!
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('marks spinner as stop with mark', () => {
  stdout.out = ''
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop({ mark: 'V', color: 'magenta' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #stop[?25l[1G[2K[1G[33m⠙[39m #stop[?25l[1G[2K[1G[33m⠹[39m #stop[1G[2K[1G[35mV[39m #stop
    [?25h"
  `
  let snapCI = `
    "[33m-[39m #stop
    [33m-[39m #stop
    [33m-[39m #stop
    [35mV[39m #stop
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
