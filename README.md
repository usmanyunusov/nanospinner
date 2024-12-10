# Nano Spinner

The simplest and tiniest terminal spinner for Node.js

```js
import { createSpinner } from 'nanospinner'

const spinner = createSpinner('Run test').start()

setTimeout(() => {
  spinner.success()
}, 1000)
```

- Only **single dependency** (picocolors).
- It **14 times** smaller than `ora`.
- Support both CJS and ESM projects.
- **TypeScript** type declarations included.

## Motivation

With `nanospinner` we are trying to draw attention to the `node_modules` size problem and promote performance-first culture.

## Benchmarks

The space in `node_modules` including sub-dependencies:

```diff
$ node ./test/size.js
Data from packagephobia.com
  ora           280 kB
+ nanospinner    20 kB
```

## API

**`.spin()`**

Looping over `spin` method will animate a given spinner.

```js
setInterval(() => {
  spinner.spin()
}, 25)
```

**`.start(options?)`**

In order to start the spinner call `start`. This will perform drawing the spinning animation

```js
spinner.start()
spinner.start('Start')
spinner.start({ text: 'Start', color: 'yellow' })
```

**`.stop(options?)`**

In order to stop the spinner call `stop`. This will finish drawing the spinning animation and return to new line.

```js
spinner.stop()
spinner.stop('Done!')
spinner.stop({ text: 'Done!', mark: ':O', color: 'magenta' })
```

**`.success(options?)`**

Use `success` call to stop the spinning animation and replace the spinning symbol with check mark character to indicate successful completion.

```js
spinner.success()
spinner.success('Successful!')
spinner.success({ text: 'Successful!', mark: ':)' })
```

**`.warn(options?)`**

Use `warn` call to stop the spinning animation and replace the spinning symbol with warn mark character to indicate warning completion.

```js
spinner.warn()
spinner.warn('Warning!')
spinner.warn({ text: 'Warning!', mark: ':|' })
```

**`.error(options?)`**

Use `error` call to stop the spinning animation and replace the spinning symbol with cross character to indicate error completion.

```js
spinner.error()
spinner.error('Error!')
spinner.error({ text: 'Error!', mark: ':(' })
```

**`.info(options?)`**

Use `info` call to stop the spinning animation and replace the spinning symbol with info mark character to indicate info completion.

```js
spinner.info()
spinner.info('Info!')
spinner.info({ text: 'Info!', mark: 'i' })
```

**`.update(options?)`**

Use `update` call to dynamically change

```js
spinner.update('Run test')
spinner.update({
  text: 'Run test',
  color: 'white',
  stream: process.stdout,
  frames: ['.', 'o', '0', '@', '*'],
  interval: 100,
})
```

**`.clear()`**

Clears the spinner`s output

```js
spinner.clear()
```

**`.reset()`**

In order to reset the spinner to its initial frame do:

```js
spinner.reset()
```

## Roadmap

- [ ] Multi spinners
