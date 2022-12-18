import { input } from '../input/18.mjs'

const parseCoord = coord => coord.split(',').map( n => parseInt(n, 10) )
const encodeCoord = coord => coord.join(',')
const getNeighbors = ([x, y, z]) =>
 [[x + 1, y, z], [x - 1, y, z],
  [x, y + 1, z], [x, y - 1, z],
  [x, y, z + 1], [x, y, z - 1]]

let shape = new Set(input.trim().split('\n'))

let surfaceArea = 0
for (let coord of shape.values()) {
  getNeighbors(parseCoord(coord)).forEach( n => {
    if (!shape.has(encodeCoord(n))) {
      surfaceArea++
    }
  })
}

console.log(shape.size)
console.log('part1:', surfaceArea)
