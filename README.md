# Nano Spinner

The simplest and tiniest terminal spinner for Node.js

```js
import { createSpinner } from 'nanospinner'

let spinner = createSpinner('Run test').start()

setTimeout(() => {
  spinner.success()
}, 1000)
```

- Only **single dependency** (picocolors).
- It **~40 times** smaller and **~2 times** faster than `ora`.
- Support both CJS and ESM projects.
- TypeScript type declarations included.

## Benchmarks

The space in `node_modules` including sub-dependencies:

```
$ ./test/size.js
Data from packagephobia.com
ora           597 kB
mico-spinner   28 kB
nanospinner    13 kB
```

Library loading time:

```
$ ./test/loading.js
nanospinner    1.551 ms
```

## API

<details>
  <summary>
    <b>
      <code>
        spin()
      </code>
    </b>
  </summary>

Looping over `spin` method will animate a given spinner.

```js
setInterval(() => {
  spinner.spin()
}, 25)
```

</details>

<details>
  <summary>
    <b>
      <code>
        start(opts?)
      </code>
    </b>
  </summary>

In order to start the spinner call `start`. This will perform drawing the spinning animation

```js
spinner.start()
spinner.start({ text: 'Start' })
```

</details>

<details>
  <summary>
    <b>
      <code>
        stop(opts?)
      </code>
    </b>
  </summary>

In order to stop the spinner call `stop`. This will finish drawing the spinning animation and return to new line.

```js
spinner.stop()
spinner.stop({ text: 'Done!', mark: ':O' })
```

</details>

<details>
  <summary>
    <b>
      <code>
        success(opts?)
      </code>
    </b>
  </summary>

Use `success` call to stop the spinning animation and replace the spinning symbol with check mark character to indicate successful completion.

```js
spinner.success()
spinner.success({ text: 'Successful!', mark: ':)' })
```

</details>

<details>
  <summary>
    <b>
      <code>
        error(opts?)
      </code>
    </b>
  </summary>

Use `error` call to stop the spinning animation and replace the spinning symbol with cross character to indicate error completion.

```js
spinner.error()
spinner.error({ text: 'Error!', mark: ':(' })
```

</details>

<details>
  <summary>
    <b>
      <code>
        update(opts?)
      </code>
    </b>
  </summary>

Use `update` call to dynamically change

```js
spinner.update({
  text: 'Run test',
  stream: stream.stdout,
  frames: ['.', 'o', '0', '@', '*'],
  interval: 100
})
```

</details>

<details>
  <summary>
    <b>
      <code>
        reset()
      </code>
    </b>
  </summary>

In order to reset the spinner to its initial frame do:

```js
spinner.reset()
```

</details>

## Roadmap

- [ ] Multi spinners
