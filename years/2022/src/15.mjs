import { input } from '../input/15.mjs'

const manhattanDistance = (sx, sy, bx, by) => Math.abs(sx - bx) + Math.abs(sy - by)

const sliceRow = 2000000
const targetSize = 4000000

const eliminated = new Set()
const beaconsOnSlice = new Set()
input.trim().split('\n')
  .map( line => line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/) )
  .map(([ _, sx, sy, bx, by ]) => [ sx, sy, bx, by ].map( d => parseInt(d, 10) ))
  .forEach(([ sx, sy, bx, by ]) => {
    if (by == sliceRow) {
      beaconsOnSlice.add(bx)
    }
    let manhattan = manhattanDistance(sx, sy, bx, by)
    let sensorYdistance = Math.abs(sy - sliceRow)
    if (sensorYdistance <= manhattan) {
      let xTravel = manhattan - sensorYdistance
      for (let x = sx - xTravel; x <= sx + xTravel; x++) {
        eliminated.add(x)
      }
    }
  })

console.log('part1', eliminated.size - beaconsOnSlice.size)

let sensors = input.trim().split('\n')
  .map( line => line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/) )
  .map(([ _, sx, sy, bx, by ]) => [ sx, sy, bx, by ].map( d => parseInt(d, 10) ))
  .map(([ sx, sy, bx, by ]) => ({ sx, sy, manhattan: manhattanDistance(sx, sy, bx, by) }))

let row = new Array(targetSize)
const checkRow = y => {
  row.fill(true)
  sensors.forEach(({ sx, sy, manhattan }) => {
    let sensorYdistance = Math.abs(sy - y)
    let xTravel = manhattan - sensorYdistance
    if (xTravel >= 0) {
      row.fill(false, Math.max(sx - xTravel, 0), Math.min(sx + xTravel, targetSize))
      // for (let x = Math.max(sx - xTravel, 0); x <= Math.min(sx + xTravel, targetSize); x++) {
      //   row[x] = false
      // }
    }
  })
  // console.log(row)
  let stillOpen = row.findIndex( v => v )
  if (stillOpen != -1) {
    return { x: stillOpen, y: y }
  } else {
    return null
  }
}

let start = Date.now()
let lastTime = Date.now()
for (let y = 0; y < targetSize; y++) {
  if (y % 100 == 0) {
    let n = Date.now()
    console.log(y, n - lastTime, 'ms', (n - start) / 1000, 's')
    lastTime = n
  }
  
  let result = checkRow(y)
  if (result) {
    console.log(result, result.x * 4000000 + result.y)
    break
  }
}

// let s = Date.now()
// console.log('starting grid creation')
// let grid = new Array(targetSize).fill().map( _ => new Array(targetSize).fill(true) )
// console.log('finished grid creation', (Date.now() - s) / 1000)

// input.trim().split('\n')
//   .map( line => line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/) )
//   .map(([ _, sx, sy, bx, by ]) => [ sx, sy, bx, by ].map( d => parseInt(d, 10) ))
//   .map(([ sx, sy, bx, by ]) => ({ sx, sy, manhattan: manhattanDistance(sx, sy, bx, by) }))
//   // .forEach(({ sx, sy, manhattan }) => {
//   //   if (sx - manhattan <= 0) {
//   //     console.log(`0 | (x=${sx}, y=${sy}) -> ${manhattan}`)
//   //   }
//   //   if (  sx + manhattan >= targetSize) {
//   //     console.log(`${targetSize} | (x=${sx}, y=${sy}) -> ${manhattan}`)
//   //   }
//   // })
//   .sort((l, r) => l.manhattan - r.manhattan)
//   .forEach(({ sx, sy, manhattan }) => {
//     console.log(`(${sx}, ${sy}) -> ${manhattan}`)
//   })

// const withinRange = (x, y) => {
//   for (let { sx, sy, manhattan } of sensors) {
//     if (manhattanDistance(sx, sy, x, y) <= manhattan)
//       return true
//   }
//   return false
// }

// const findOutOfRange = () => {
//   for (let x = 0; x <= targetSize; x++) {
//     // if (x % 1000 == 0) {
//       console.log("x:", x)
//     // }
//     for (let y = 0; y <= targetSize; y++) {
//       if (!withinRange(x, y)) {
//         return x * 4000000 + y
//       }
//     }
//   }
// }

// console.log('part2', findOutOfRange())
