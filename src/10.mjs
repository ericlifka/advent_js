import { input as input } from '../input/10.mjs'

let reg = 1
let signals = [ reg ]

const noop = () => { signals.push(reg) }
const addX = v => { signals.push(reg); signals.push(reg); reg += v }

input.trim().split('\n').map(line => line.split(' '))
  .forEach(([instr, arg]) =>
    instr == 'noop'
      ? noop()
      : addX(parseInt(arg, 10)))

let signalStrength
 = 20 * signals[20] 
 + 60 * signals[60]
 + 100 * signals[100]
 + 140 * signals[140]
 + 180 * signals[180]
 + 220 * signals[220]

console.log(signalStrength)

let output = ''
let cycle = 0

for (let row = 0; row < 6; row++) {
  for (let col = 0; col < 40; col++) {
    let signal = signals[++cycle]
    output += (signal == col || signal - 1 == col || signal + 1 == col) ? "#" : "."
  }
  output += "\n"
}

console.log(output)
