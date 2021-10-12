let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = (symbols) => {
  stdout.out += symbols
}

it(`long message usage`, () => {
  stdout.out = ''
  let spinner = createSpinner(
    'Permission to use, copy, modify, and/or distributethis software for anypurpose\n with or without fee is hereby granted,provided that the above copyright\n notice and this permission notice appear in all copies.',
    { stream: stdout }
  )

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success()

  let snapLocal = `
    "[?25l[1G[33m⠋[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.[?25l[1G[2K[1G[1A[2K[1G[1A[2K[1G[33m⠙[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.[?25l[1G[2K[1G[1A[2K[1G[1A[2K[1G[33m⠹[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.[1G[2K[1G[1A[2K[1G[1A[2K[1G[32m✔[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.
    [?25h"
  `
  let snapCI = `
    "[33m-[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.
    [33m-[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.
    [33m-[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.
    [32m✔[39m Permission to use, copy, modify, and/or distributethis software for anypurpose
     with or without fee is hereby granted,provided that the above copyright
     notice and this permission notice appear in all copies.
    "
  `;
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it(`long message literal template`, () => {
  stdout.out = ''
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

  let snapLocal = `
    "[?25l[1G[33m⠋[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        [?25l[1G[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[33m⠙[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        [?25l[1G[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[33m⠹[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        [1G[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[1A[2K[1G[32m✔[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        
    [?25h"
  `
  let snapCI = `
    "[33m-[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        
    [33m-[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        
    [33m-[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        
    [32m✔[39m 
            Permission to use, copy, modify, and/or distributethis software for anypurpose 
            with or without fee is hereby granted,provided that the above copyright 
            notice and this permission notice appear in all copies.
        
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
