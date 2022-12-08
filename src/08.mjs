import { input } from '../input/08.mjs'

const maxReducer = (a, b) => Math.max(a, b)

const trees = input
  .trim()
  .split('\n')
  .map( row => row.split('').map( d => parseInt(d, 10)))

const slice = (x, y, dx, dy) => {
  let s = []
  while (  (x += dx) >= 0
        && (y += dy) >= 0
        && y < trees.length 
        && x < trees[y].length) {
    s.push(trees[y][x])
  }
  return s
}

const getSlices = (x, y) =>
  [ slice(x, y,  0,  1)
  , slice(x, y,  1,  0)
  , slice(x, y,  0, -1)
  , slice(x, y, -1,  0)
  ]

let countVisible = trees
  .map((row, y) => row.map((tree, x) =>
    getSlices(x, y)
      .map( slice => slice.reduce( (blocked, t) => blocked || t >= tree, false ))
      .reduce( (visible, blocked) => visible || !blocked, false )))
  .reduce( (sum, row) => sum + row.reduce( (s, t) => s + +t, 0 ), 0 )

console.log('part1', countVisible)

let visibilityScores = trees
  .map((row, y) => row.map((tree, x) =>
    getSlices(x, y)
      .map( slice => slice
        .reduce( ({ count, blocked }, t) => blocked
                                            ? { count, blocked }
                                            : { count: count + 1
                                              , blocked: t >= tree }
               , { count: 0, blocked: false }))
      .reduce((score, n) => score * n.count, 1)))
  .map( row => row.reduce(maxReducer) ).reduce(maxReducer)

console.log('part2', visibilityScores)
