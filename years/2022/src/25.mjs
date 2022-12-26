import { input } from '../input/25.mjs'

let total = (sum, d) => sum + d
let DIGITS = { "2": 2, "1": 1, "0": 0, "-": -1, "=": -2 }
let REVERSE = { [-2]: '=', [-1]: '-', [0]: '0',  [1]: '1', [2]: '2' }
let PLACES = new Array(22).fill().map((_, i) => Math.pow(5, i))
let numbers = input.trim().split('\n')

const convert = snafu =>
  snafu
    .split('')
    .reverse()
    .map((d, p) => DIGITS[d] * PLACES[p])
    .reduce(total, 0)

const fixAt = (places, index) => {
  if (places[index] > 2) {
    places[index] -= 5
    places[index + 1] += 1
    fixAt(places, index + 1)
  }
}

const unconvert = b10 => {
  let places = new Array(22).fill(0)
  for (let i = PLACES.length - 1; i >= 0; i--) {
    while (b10 >= PLACES[i]) {
      b10 -= PLACES[i]
      places[i] += 1
    }
    fixAt(places, i)
  }
  while (places[places.length - 1] == 0) {
    places.pop()
  }
  return places.map(d => REVERSE[d]).reverse().join('')
}

let sum = numbers.map(convert).reduce(total, 0)

console.log(unconvert(sum))
