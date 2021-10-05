let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it(`marks spinner as start`, async () => {
  let spinner = createSpinner('#start', { stream: stdout })

  spinner.start()
  spinner.error()

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #start[2K[1G[31m✖[39m #start
    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #start
    [2K[1G[31m✖[39m #start
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
