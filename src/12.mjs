import { input } from '../input/12.mjs'

let inputHeights = input.trim().split('\n').map( line => line.split('') )
let START = inputHeights.reduce((location, row, y) => location || row.reduce((location, ch, x) => ch == 'S' ? ({x, y}) : location, null), null)
let END = inputHeights.reduce((location, row, y) => location || row.reduce((location, ch, x) => ch == 'E' ? ({x, y}) : location, null), null)
let allStarts = inputHeights.reduce((starts, row, y) => row.reduce((starts, ch, x) => ch == 'S' || ch == 'a' ? [...starts, {x, y}] : starts, starts), [])

const getHeights = () => inputHeights.map( row => row.map( ch => ch == 'S' ? 1 : ch == 'E' ? 26 : ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1 ))
const getSteps = start => inputHeights.map((line, y) => line.map((_, x) => y == start.y && x == start.x ? 0 : Number.MAX_SAFE_INTEGER ))
const getNeighbors = ({x, y}) => [ {x, y: y + 1}, {x, y: y - 1} , {y, x: x + 1}, {y, x: x - 1} ]

const stepsFromStartToEnd = (start, end) => {
  let heights = getHeights()
  let steps = getSteps(start)
  let queue = [ {...start} ]

  while (queue.length > 0) {
    let position = queue.shift()
  
    let height = heights[position.y][position.x]
    let stepsTo = steps[position.y][position.x]
    let neighbors = getNeighbors(position)
  
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

  return steps[end.y][end.x]
}


let part1 = stepsFromStartToEnd(START, END)
let part2 = allStarts.map( start => stepsFromStartToEnd(start, END) ).sort()[0]

console.log(part1, part2)
