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

const withinRange = (x, y) => {
  for (let { sx, sy, manhattan } of sensors) {
    if (manhattanDistance(sx, sy, x, y) <= manhattan)
      return true
  }
  return false
}

const findOutOfRange = () => {
  for (let x = 0; x <= targetSize; x++) {
    // if (x % 1000 == 0) {
      console.log("x:", x)
    // }
    for (let y = 0; y <= targetSize; y++) {
      if (!withinRange(x, y)) {
        return x * 4000000 + y
      }
    }
  }
}

console.log('part2', findOutOfRange())
