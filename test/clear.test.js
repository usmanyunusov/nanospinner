let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it(`marks spinner as clear`, () => {
  stdout.out = ''
  let spinner = createSpinner('#clear', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.clear()
  stdout.write('console.log()')

  let snapLocal = `"[?25l[1G[33m⠋[39m #clear[?25l[1G[2K[1G[33m⠙[39m #clear[?25l[1G[2K[1G[33m⠹[39m #clear[1G[2K[1Gconsole.log()"`
  let snapCI = `
    "[33m-[39m #clear
    [33m-[39m #clear
    [33m-[39m #clear
    [1Gconsole.log()"
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
