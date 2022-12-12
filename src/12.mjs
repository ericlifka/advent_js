import { input } from '../input/12.mjs'

const neighborsOf = ({x, y}) => [ {x, y: y + 1}, {x, y: y - 1}
                                , {y, x: x + 1}, {y, x: x - 1} ]

let start, end
let heights = input
  .trim()
  .split('\n')
  .map((line, y) => line
    .split('')
    .map((ch, x) => {
      if (ch == 'S') {
        start = { x, y }
        return 1
      } else if (ch == 'E') {
        end = { x, y }
        return 26
      } else {
        return ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1
      }
    }))

let steps = heights.map( line => line.map( _ => Number.MAX_SAFE_INTEGER ))
steps[start.y][start.x] = 0

let queue = [ {...start} ]

while (queue.length > 0) {
  let position = queue.shift()

  let height = heights[position.y][position.x]
  let stepsTo = steps[position.y][position.x]
  let neighbors = neighborsOf(position)

  neighbors.forEach( n => {
    if (  heights[n.y] && heights[n.y][n.x] // it exists
       && heights[n.y][n.x] <= height + 1   // it's at most one step heigher
       && steps[n.y][n.x] > stepsTo + 1 )   // it hasn't already been visited with a shorter path
    {
      steps[n.y][n.x] = stepsTo + 1
      queue.push( {...n} )
    }
  })
}

// // console.log(heights, steps)
// heights.forEach( row => console.log(row.join(`,\t`)))
// console.log('\n')
// steps.forEach( row => console.log(row.join(`,\t`)))
console.log(steps[end.y][end.x])
