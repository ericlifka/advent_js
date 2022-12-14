import { input, p1Input, p2Input } from '../input/13.mjs'

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


let part1 = p1Input(input)
  .map(([left, right]) => compare(left, right))
  .reduce((accum, sortVal, i) => sortVal == UNORDERED ? accum : accum + i + 1, 0)

  
let packets = [ [[2]], [[6]], ...p2Input(input) ]
packets[0].flag = packets[1].flag = true

let part2 = packets
  .sort(compare)
  .reduce((accum, packet, i) => packet.flag ? (i + 1) * accum : accum, 1)

console.log(part1, part2)
