import { input } from '../input/13.mjs'

const ORDERED = -1, UNORDERED = 1, NEUTRAL = 0

const compare = (left, right) =>
  typeof left == 'number' && typeof right == 'number'
    ? compareInts(left, right)
    : compareLists(toList(left), toList(right))

const compareInts = (left, right) => 
    left < right ? ORDERED 
  : left > right ? UNORDERED 
  : NEUTRAL

const compareLists = ([firstLeft, ...restLeft], [firstRight, ...restRight]) => 
    firstLeft == undefined && firstRight == undefined ? NEUTRAL
  : firstLeft == undefined ? ORDERED
  : firstRight == undefined ? UNORDERED
  : compare(firstLeft, firstRight) || compareLists(restLeft, restRight)

const toList = val => typeof val == 'number' ? [ val ] : val


let part1 = input
  .trim()
  .split('\n\n')
  .map( pair => pair.split('\n').map( val => eval(val)))
  .map(([left, right]) => compare(left, right))
  .map((sortVal, i) => sortVal == UNORDERED ? 0 : i + 1)
  .reduce((a, b) => a + b)

let packets = 
`[[2]]\n[[6]]\n${input}`
  .trim()
  .replaceAll('\n\n', '\n')
  .split('\n')
  .map( val => eval(val))

packets[0].flag = packets[1].flag = true

let part2 = packets
  .sort(compare)
  .reduce((accum, packet, i) => packet.flag ? (i + 1) * accum : accum, 1)

console.log(part1, part2)
