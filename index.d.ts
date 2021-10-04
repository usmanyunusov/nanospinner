interface Options {
  text?: string
  stream?: NodeJS.WriteStream
  interval?: number
  frames?: string[]
}

interface SpinnerOptions {
  text?: string
  mark?: string
}

interface Spinner {
  update(opts: Options): Spinner
  reset(): Spinner
  spin(): Spinner
  stop(opts: SpinnerOptions): Spinner
  start(): Spinner
  error(opts: SpinnerOptions): Spinner
  success(opts: SpinnerOptions): Spinner
}

export function createSpinner(text?: string, opts?: Options): Spinner
  