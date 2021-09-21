#!/usr/bin/env node

import { bold, gray } from 'nanocolors'
import { get } from 'https'

async function getJSON(url) {
  return new Promise(resolve => {
    get(url, res => {
      let text = ''
      res.on('data', chunk => {
        text += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(text))
      })
    })
  })
}

async function benchmark(lib) {
  let data = await getJSON(`https://packagephobia.com/v2/api.json?p=${lib}`)
  let size = data.install.bytes
  process.stdout.write(
    lib.padEnd('ansi-colors  '.length) +
      bold(
        Math.round(size / 1024)
          .toString()
          .padStart(4)
      ) +
      ' kB\n'
  )
}

async function start() {
  process.stdout.write(gray('Data from packagephobia.com\n'))
  await benchmark('ora')
  await benchmark('cli-spinners')
  await benchmark('mico-spinner')
  await benchmark('nanospinner')
}

start()
