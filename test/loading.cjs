#!/usr/bin/env node
const { performance } = require('perf_hooks')

let before
function showTime(name) {
  let after = performance.now()
  let time = (Math.round(1000 * (after - before)) / 1000).toString()
  time = time.replace(/\.\d$/, '$&00').replace(/\.\d\d$/, '$&0')
  let title = name.padEnd('mico-spinner  '.length)
  process.stdout.write(title + '\x1B[1m' + time.padStart(6) + '\x1B[22m ms\n')
}

before = performance.now()
let micospinner = require('mico-spinner')
showTime('mico-spinner')

before = performance.now()
let { createSpinner } = require('../index.cjs')
showTime('nanospinner')
