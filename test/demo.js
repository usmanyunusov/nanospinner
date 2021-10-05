let { createSpinner } = require('../')

let spinner = createSpinner('Test').start()
setTimeout(() => {
  spinner.success()
}, 1000)
