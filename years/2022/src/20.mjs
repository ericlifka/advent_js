import { input } from '../input/20.mjs'

const nums = input.trim().split('\n')
  .map( n => parseInt(n, 10) )
  .map((n, i) => ({ n: n * 811589153, i }))

const file = [...nums]
const size = nums.length

const swap = (f, s) => {
  let _f = file[f]
  let _s = file[s]
  file[f] = _s
  file[s] = _f
  file[f].i = f
  file[s].i = s
}

const wrapForward = () => {
  let last = file[size - 1]
  for (let i = size - 1; i > 0; i--) file[i] = file[i - 1]
  file[0] = last
  for (let i = 0; i < size; i++) file[i].i = i
}

const wrapBackward = () => {
  let first = file[0]
  for (let i = 0; i < size - 1; i++) file[i] = file[i + 1]
  file[size - 1] = first
  for (let i = 0; i < size; i++) file[i].i = i
}

const stepForward = elem => {
  if (elem.i == size - 1) wrapForward()
  swap(elem.i, elem.i + 1)
}

const stepBackward = elem => {
  if (elem.i == 0) wrapBackward()
  swap(elem.i, elem.i - 1)
  if (elem.i == 0) wrapBackward()
}

const step = (elem, count, stepper) => {
  for (let i = 0; i < count % (size - 1); i++)
    stepper(elem)
}

for (let i = 0; i < 10; i++)
  nums.forEach( elem =>
    step(elem, Math.abs(elem.n), elem.n < 0 ? stepBackward : stepForward))

let z = file.findIndex( elem => elem.n == 0 )
console.log(file[(z + 1000) % size].n + file[(z + 2000) % size].n + file[(z + 3000) % size].n)
