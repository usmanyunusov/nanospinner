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
- It **45 times** smaller than `ora`.
- Support both CJS and ESM projects.
- **TypeScript** type declarations included.

## Motivation

With `nanospinner` we are trying to draw attention to the `node_modules` size problem and promote performance-first culture.

## Benchmarks

The space in `node_modules` including sub-dependencies:

```diff
$ node ./test/size.js
Data from packagephobia.com
  ora           597 kB
+ nanospinner    13 kB
```

## API
__`.spin()`__

Looping over `spin` method will animate a given spinner.

```js
setInterval(() => {
  spinner.spin()
}, 25)
```

__`.start(options?)`__

In order to start the spinner call `start`. This will perform drawing the spinning animation

```js
spinner.start()
spinner.start({ text: 'Start', color: 'yellow' })
```

__`.stop(options?)`__

In order to stop the spinner call `stop`. This will finish drawing the spinning animation and return to new line.

```js
spinner.stop()
spinner.stop({ text: 'Done!', mark: ':O', color: 'magenta' })
```

__`.success(options?)`__

Use `success` call to stop the spinning animation and replace the spinning symbol with check mark character to indicate successful completion.

```js
spinner.success()
spinner.success({ text: 'Successful!', mark: ':)' })
```

__`.warn(options?)`__

Use `warn` call to stop the spinning animation and replace the spinning symbol with warn mark character to indicate warning completion.

```js
spinner.warn()
spinner.warn({ text: 'Warning!', mark: ':|' })
```

__`.error(options?)`__

Use `error` call to stop the spinning animation and replace the spinning symbol with cross character to indicate error completion.

```js
spinner.error()
spinner.error({ text: 'Error!', mark: ':(' })
```

__`.update(options?)`__

Use `update` call to dynamically change

```js
spinner.update({
  text: 'Run test',
  color: 'white',
  stream: process.stdout,
  frames: ['.', 'o', '0', '@', '*'],
  interval: 100,
})
```

__`.clear()`__

Clears the spinner`s output

```js
spinner.clear()
```

__`.reset()`__

In order to reset the spinner to its initial frame do:

```js
spinner.reset()
```

## Roadmap

- [ ] Multi spinners
