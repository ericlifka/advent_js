import { input } from '../input/08.mjs'

let trees = input
  .trim()
  .split('\n')
  .map( row => row.split('').map( d => parseInt(d, 10)))

let visi = trees.map( row => row.map(_ => 0) )

for (let y = 0; y < trees.length; y++) {
  let leftHeight = -1
  let rightHeight = -1
  for (let x = 0; x < trees[y].length; x++) {
    if (leftHeight < trees[y][x]) {
      visi[y][x] += 1
      leftHeight = trees[y][x]
    }
    if (rightHeight < trees[y][trees[y].length - x - 1]) {
      visi[y][trees[y].length - x - 1] += 1
      rightHeight = trees[y][trees[y].length - x - 1]
    }
  }
}

for (let x = 0; x < trees[0].length; x++) {
  let topHeight = -1
  let bottomHeight = -1
  for (let y = 0; y < trees.length; y++) {
    if (topHeight < trees[y][x]) {
      visi[y][x] += 1
      topHeight = trees[y][x]
    }
    if (bottomHeight < trees[trees.length - y - 1][x]) {
      visi[trees.length - y - 1][x] += 1
      bottomHeight = trees[trees.length - y - 1][x]
    }
  }
}

let visibleTrees = visi.reduce((count, row) => count + row.reduce((c, tree) => c + (tree > 0 ? 1 : 0), 0), 0)

console.log(visibleTrees)
