import { input } from '../input/18.mjs'

let min = -1, max = 20
const parseCoord = coord => coord.split(',').map( n => parseInt(n, 10) )
const encodeCoord = coord => coord.join(',')
const getNeighbors = ([x, y, z]) =>
 [ [x + 1, y, z], [x - 1, y, z]
 , [x, y + 1, z], [x, y - 1, z]
 , [x, y, z + 1], [x, y, z - 1]
 ].filter( coord => coord.every( n => n >= min && n <= max))


let shape = new Set(input.trim().split('\n'))

let queue = [ encodeCoord([max, max, max]) ]
let water = new Set()
while (queue.length > 0) {
  let fillAt = queue.shift()
  if (!water.has(fillAt)) {
    water.add(fillAt)
    getNeighbors(parseCoord(fillAt)).forEach( n => {
      if (!shape.has(encodeCoord(n)))
        queue.push(encodeCoord(n))
    })
  }
}

let surfaceArea = 0
for (let coord of water.values()) {
  getNeighbors(parseCoord(coord)).forEach( n => {
    if (shape.has(encodeCoord(n)))
      surfaceArea++
  })
}

console.log('surface area:', surfaceArea)
