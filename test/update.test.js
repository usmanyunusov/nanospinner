let { test } = require('uvu')
let { is } = require('uvu/assert')

let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

test.before.each(() => {
  stdout.out = ''
})

test('uses custom frames', () => {
  let spinner = createSpinner('#update', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.update({ frames: ['.', 'o', '0', '@', '*'], text: 'Change update' })
  spinner.spin()
  spinner.spin()
  spinner.spin()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m0\x1B[39m Change update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m@\x1B[39m Change update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m*\x1B[39m Change update'
  let snapCI =
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m.\x1B[39m Change update\n' +
    '\x1B[33mo\x1B[39m Change update\n' +
    '\x1B[33m0\x1B[39m Change update\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('uses custom frames with less elements', () => {
  let spinner = createSpinner('#update', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.update({ frames: ['.', 'o'], text: 'Change update' })
  spinner.spin()
  spinner.spin()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m.\x1B[39m Change update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33mo\x1B[39m Change update'
  let snapCI =
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m.\x1B[39m Change update\n' +
    '\x1B[33mo\x1B[39m Change update\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('uses default frames if new ones have no elements', () => {
  let spinner = createSpinner('#update', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.update({ frames: [], text: 'Change update' })
  spinner.spin()
  spinner.spin()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠸\x1B[39m Change update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠼\x1B[39m Change update'
  let snapCI =
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m Change update\n' +
    '\x1B[33m-\x1B[39m Change update\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test('update supports string', () => {
  let spinner = createSpinner('#update', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.update('Change update')
  spinner.spin()
  spinner.spin()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m #update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠸\x1B[39m Change update\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[33m⠼\x1B[39m Change update'
  let snapCI =
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m #update\n' +
    '\x1B[33m-\x1B[39m Change update\n' +
    '\x1B[33m-\x1B[39m Change update\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
