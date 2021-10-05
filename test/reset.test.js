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

  let snapLocal = `"[?25l[1G[33m⠋[39m #reset[?25l[1G[33m⠙[39m #reset[?25l[1G[33m⠹[39m #reset[?25l[1G[33m⠋[39m #reset[?25l[1G[33m⠙[39m #reset"`
  let snapCI = `
    "[1G[33m-[39m #reset
    [1G[33m-[39m #reset
    [1G[33m-[39m #reset
    [1G[33m-[39m #reset
    [1G[33m-[39m #reset
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
