let { createSpinner } = require('../')

let spinner = createSpinner('Run test').start()
setTimeout(() => {
  spinner.success()
}, 1000)
