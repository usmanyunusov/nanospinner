# Nano Spinner

Simple and tiny spinner library for Node.js

- It takes **18 times less** space in node_modules than `ora`.
- It is **6 times faster** than `mico-spinner`.

```js
import { createSpinner } from 'nanospinner'

let spinner = createSpinner('Run test')

spinner.start()
setTimeout(() => {
  spinner.success()
}, 1000)
```

## Benchmarks

The space in `node_modules` including sub-dependencies:

```
$ ./test/size.js
Data from packagephobia.com
ora           597 kB
cli-spinners   28 kB
mico-spinner   28 kB
nanospinner    25 kB
```

Library loading time:

```
$ ./test/loading.js
mico-spinner  13.014 ms
nanospinner    1.930 ms
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
        start()
      </code>
    </b>
  </summary>

  In order to start the spinner call `start`. This will perform drawing the spinning animation

  ```js
  spinner.start()
  ```
</details>

<details>
  <summary>
    <b>
      <code>
        stop()
      </code>
    </b>
  </summary>

  In order to stop the spinner call `stop`. This will finish drawing the spinning animation and return to new line.

  ```js
  spinner.stop()
  spinner.stop('Done!')
  ```
</details>

<details>
  <summary>
    <b>
      <code>
        success()
      </code>
    </b>
  </summary>

  Use `success` call to stop the spinning animation and replace the spinning symbol with check mark character to indicate successful completion.

  ```js
  spinner.success()
  spinner.success('Successful!')
  ```
</details>

<details>
  <summary>
    <b>
      <code>
        error()
      </code>
    </b>
  </summary>

  Use `error` call to stop the spinning animation and replace the spinning symbol with cross character to indicate error completion.

  ```js
  spinner.error()
  spinner.error('Error!')
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
