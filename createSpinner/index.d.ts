type Options = {
  stream?: NodeJS.WriteStream
  interval?: number
  frames?: string[]
}

type SpinnerOptions = {
  text?: string
  mark?: string
}

type Spinner = {
  text: string
  frames: string[]
  interval: number
  state: string

  reset(): Spinner
  spin(): Spinner
  stop(opts: SpinnerOptions): Spinner
  start(): Spinner
  error(opts: SpinnerOptions): Spinner
  success(opts: SpinnerOptions): Spinner
}

export function createSpinner(text?: string, opts?: Options): Spinner
