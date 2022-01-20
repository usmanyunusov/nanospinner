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

test(`long message usage`, () => {
  let spinner = createSpinner(
    'Permission to use, copy, modify, and/or distributethis software for anypurpose\n with or without fee is hereby granted,provided that the above copyright\n notice and this permission notice appear in all copies.',
    { stream: stdout }
  )

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\x1B[1G\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[32m✔\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\n' +
    '\x1B[33m-\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\n' +
    '\x1B[33m-\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\n' +
    '\x1B[32m✔\x1B[39m Permission to use, copy, modify, and/or distributethis software for anypurpose\n' +
    ' with or without fee is hereby granted,provided that the above copyright\n' +
    ' notice and this permission notice appear in all copies.\n'

  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test(`long message literal template`, () => {
  let spinner = createSpinner(
    `
        Permission to use, copy, modify, and/or distributethis software for anypurpose 
        with or without fee is hereby granted,provided that the above copyright 
        notice and this permission notice appear in all copies.
    `,
    { stream: stdout }
  )

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success()

  let snapLocal =
    '\x1B[?25l\x1B[1G\x1B[33m⠋\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[33m⠙\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \x1B[?25l\x1B[1G\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[33m⠹\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \x1B[1G\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[1A\x1B[2K\x1B[1G\x1B[32m✔\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \n' +
    '\x1B[?25h'
  let snapCI =
    '\x1B[33m-\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \n' +
    '\x1B[33m-\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \n' +
    '\x1B[33m-\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \n' +
    '\x1B[32m✔\x1B[39m \n' +
    '        Permission to use, copy, modify, and/or distributethis software for anypurpose \n' +
    '        with or without fee is hereby granted,provided that the above copyright \n' +
    '        notice and this permission notice appear in all copies.\n' +
    '    \n'
  is(stdout.out, process.env.CI ? snapCI : snapLocal)
})

test.run()
