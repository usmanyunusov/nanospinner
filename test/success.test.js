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

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #success[?25l[1G[33m⠙[39m #success[?25l[1G[33m⠹[39m #success[2K[1G[32m✔[39m #success
    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [2K[1G[32m✔[39m #success
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('marks spinner as success with message', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ text: 'Successful\n' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #success[?25l[1G[33m⠙[39m #success[?25l[1G[33m⠹[39m #success[2K[1G[32m✔[39m #success
    [?25h[?25l[1G[33m⠋[39m #success[?25l[1G[33m⠙[39m #success[?25l[1G[33m⠹[39m #success[2K[1G[32m✔[39m Successful

    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [2K[1G[32m✔[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [2K[1G[32m✔[39m Successful

    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('marks spinner as success with mark', () => {
  let spinner = createSpinner('#success', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ mark: 'V' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #success[?25l[1G[33m⠙[39m #success[?25l[1G[33m⠹[39m #success[2K[1G[32m✔[39m #success
    [?25h[?25l[1G[33m⠋[39m #success[?25l[1G[33m⠙[39m #success[?25l[1G[33m⠹[39m #success[2K[1G[32m✔[39m Successful

    [?25h[?25l[1G[33m⠋[39m #success[?25l[1G[33m⠙[39m #success[?25l[1G[33m⠹[39m #success[2K[1GV #success
    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [2K[1G[32m✔[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [2K[1G[32m✔[39m Successful

    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [1G[33m-[39m #success
    [2K[1GV #success
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
