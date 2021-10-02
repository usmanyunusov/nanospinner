import { createSpinner } from './index.js'

let spinner1 = createSpinner('Run test 1')
let spinner2 = createSpinner('Run test 2')

spinner1.start()
spinner2.start()

setTimeout(() => {
  spinner1.success()
  spinner2.error()
}, 1000)
