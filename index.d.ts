interface Options {
  stream?: NodeJS.WriteStream
  frames?: string[]
  interval?: number
  text?: string
  color?: string
}

interface Spinner {
  success(opts?: { text?: string; mark?: string; update?: boolean }): Spinner
  error(opts?: { text?: string; mark?: string; update?: boolean }): Spinner
  warn(opts?: { text?: string; mark?: string; update?: boolean }): Spinner
  stop(opts?: { text?: string; mark?: string; update?: boolean; color?: string }): Spinner
  start(opts?: { text?: string; color?: string }): Spinner
  update(opts?: Options): Spinner
  reset(): Spinner
  clear(): Spinner
  spin(): Spinner
  isSpinning(): boolean
}

export function createSpinner(text?: string, opts?: Options): Spinner
