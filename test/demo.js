let { createSpinner } = require('../dist')

let spinner = createSpinner('Run test').start()
setTimeout(() => {
  spinner.info()
}, 1000)
