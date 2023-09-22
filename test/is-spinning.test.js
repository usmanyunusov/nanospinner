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

test('detects if spinner is spinning or not', () => {
  let spinner = createSpinner('#isSpinning', { stream: stdout })
  is(spinner.isSpinning(), false)

  spinner.start()
  is(spinner.isSpinning(), true)

  spinner.stop()
  is(spinner.isSpinning(), false)
})

test('detects if spinner is spinning or not using other methods', () => {
  let spinner = createSpinner('#isSpinning', { stream: stdout })

  spinner.spin()
  is(spinner.isSpinning(), false)

  spinner.start()
  spinner.reset()
  is(spinner.isSpinning(), false)

  spinner.start()
  spinner.success()
  is(spinner.isSpinning(), false)

  spinner.start()
  spinner.clear()
  is(spinner.isSpinning(), true)

  spinner.stop()
  is(spinner.isSpinning(), false)
})

test.run()