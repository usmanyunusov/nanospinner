let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it('uses custom frames', () => {
  stdout.out = ''
  let spinner = createSpinner('#update', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.update({ frames: ['.', 'o', '0', '@', '*'], text: 'Change update' })
  spinner.spin()
  spinner.spin()
  spinner.spin()

  let snapLocal = `"[?25l[1G[33m⠋[39m #update[?25l[1G[2K[1G[33m⠙[39m #update[?25l[1G[2K[1G[33m0[39m Change update[?25l[1G[2K[1G[33m@[39m Change update[?25l[1G[2K[1G[33m*[39m Change update"`
  let snapCI = `
    "[33m-[39m #update
    [33m-[39m #update
    [33m.[39m Change update
    [33mo[39m Change update
    [33m0[39m Change update
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
