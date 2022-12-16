import { input } from '../input/15.mjs'

const manhattanDistance = (sx, sy, bx, by) => Math.abs(sx - bx) + Math.abs(sy - by)

const sliceRow = 2000000
const targetSize = 4000000

let sensors = input.trim().split('\n')
  .map( line => line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/) )
  .map(([ _, sx, sy, bx, by ]) => [ sx, sy, bx, by ].map( d => parseInt(d, 10) ))
  .map(([ sx, sy, bx, by ]) => ({ sx, sy, manhattan: manhattanDistance(sx, sy, bx, by) }))
  .sort((l, r) => l.sx - r.sx)

const checkRow = y => {
  let ranges = []
  sensors.forEach(({ sx, sy, manhattan }) => {
    let sensorYdistance = Math.abs(sy - y)
    let xTravel = manhattan - sensorYdistance
    if (xTravel >= 0) {
      ranges.push([ sx - xTravel, sx + xTravel ])
    }
  })
  ranges.sort(([l], [r]) => l - r)
  
  let range = ranges[0]
  for (let i = 1; i < ranges.length; i++) {
    let [min, max] = ranges[i]
    if (min > range[1] + 1) {
      console.log('part2', (range[1] + 1) * 4000000 + y)
      return
    }
    if (max > range[1]) {
      range[1] = max
    }
  }
  return range
}

let [min, max] = checkRow(sliceRow)
console.log('part1', Math.abs(min) + Math.abs(max))

for (let i = 0; i < targetSize; i++) {
  if (!checkRow(i)) {
    break
  }
}
