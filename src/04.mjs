import { input } from '../input/04.mjs'

let elfPairs = input
  .trim()
  .split('\n')
  .map( line => line.split(',') )
  .map( group => 
    group.map( elf => 
      elf.split('-')
         .map( n => parseInt(n, 10))))

let part1 = elfPairs
  .filter( ([[ll, lr], [rl, rr]]) => ll <= rl && lr >= rr // contains left
                                  || ll >= rl && lr <= rr // contains right
  )

console.log(part1.length)

let part2 = elfPairs
  .filter( ([[ll, lr], [rl, rr]]) => ll <= rl && lr >= rl // left overlap
                                  || ll <= rr && lr >= rr // right overlap
                                  || ll <= rl && lr >= rr // contains left
                                  || ll >= rl && lr <= rr // contains right
  )

console.log(part2.length)
