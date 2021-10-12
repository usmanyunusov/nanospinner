interface Options {
  text?: string
  stream?: NodeJS.WriteStream
  interval?: number
  frames?: string[]
}

interface Spinner {
  update(opts?: Options): Spinner
  reset(): Spinner
  spin(): Spinner
  stop(opts?: { text?: string; mark?: string }): Spinner
  start(opts?: { text?: string }): Spinner
  error(opts?: { text?: string; mark?: string }): Spinner
  success(opts?: { text?: string; mark?: string }): Spinner
}

export function createSpinner(text?: string, opts?: Options): Spinner
