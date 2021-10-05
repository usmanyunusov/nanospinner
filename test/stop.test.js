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

  let snapLocal = `
  "[?25l[1G[33m⠋[39m #stop[?25l[1G[33m⠙[39m #stop[?25l[1G[33m⠹[39m #stop[2K[1G[33m⠸[39m #stop
  [?25h"
  `
  let snapCI = `
  "[1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [2K[1G[33m-[39m #stop
  "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('stops after 2 spins and prints stop message', () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.stop({ text: 'Done!\n' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #stop[?25l[1G[33m⠙[39m #stop[?25l[1G[33m⠹[39m #stop[2K[1G[33m⠸[39m #stop
    [?25h[?25l[1G[33m⠋[39m #stop[?25l[1G[33m⠙[39m #stop[2K[1G[33m⠹[39m Done!

    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #stop
    [1G[33m-[39m #stop
    [1G[33m-[39m #stop
    [2K[1G[33m-[39m #stop
    [1G[33m-[39m #stop
    [1G[33m-[39m #stop
    [2K[1G[33m-[39m Done!

    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('marks spinner as stop with mark', () => {
  let spinner = createSpinner('#stop', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.stop({ mark: 'V' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #stop[?25l[1G[33m⠙[39m #stop[?25l[1G[33m⠹[39m #stop[2K[1G[33m⠸[39m #stop
    [?25h[?25l[1G[33m⠋[39m #stop[?25l[1G[33m⠙[39m #stop[2K[1G[33m⠹[39m Done!
    
    [?25h[?25l[1G[33m⠋[39m #stop[?25l[1G[33m⠙[39m #stop[?25l[1G[33m⠹[39m #stop[2K[1GV #stop
    [?25h"
  `;
  let snapCI = `
  "[1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [2K[1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [2K[1G[33m-[39m Done!
  
  [1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [1G[33m-[39m #stop
  [2K[1GV #stop
  "
  `;
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
