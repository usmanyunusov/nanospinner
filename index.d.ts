interface Options {
  stream?: NodeJS.WriteStream
  frames?: string[]
  interval?: number
  text?: string
}

interface Spinner {
  success(opts?: { text?: string; mark?: string }): Spinner
  error(opts?: { text?: string; mark?: string }): Spinner
  stop(opts?: { text?: string; mark?: string }): Spinner
  start(opts?: { text?: string }): Spinner
  update(opts?: Options): Spinner
  reset(): Spinner
  clear(): Spinner
  spin(): Spinner
}

export function createSpinner(text?: string, opts?: Options): Spinner
