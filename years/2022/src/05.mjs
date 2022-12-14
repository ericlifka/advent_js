import { stackState, moves } from '../input/05.mjs'

const copy = stacks =>
  stacks.map( stack => 
    stack.map( item => item ))

const moveReversed = ( stacks, [ count, from, to ] ) => 
  count == 0 
    ? stacks
    : moveReversed( moveTogether(stacks, [1, from, to]), [count - 1, from, to] )

const moveTogether = ( stacks, [ count, from, to ]
                     , s = copy(stacks)
                     , removed = s[from].splice(-1 * count)
                     , _ = s[to].push(...removed) ) => s

const getStackCode = stacks =>
  stacks
    .map( stack => stack[stack.length - 1] )
    .filter( i => i )
    .join('')

let stacks = stackState
  .split('\n')
  .map( stack => stack.split('') )

let instructions = moves
  .trim()
  .split('\n')
  .map( move => move.split(' ') )
  .map(([_, count, __, source, ___, dest]) => [count, source, dest] )
  .map( move => move.map( n => parseInt(n, 10) ))

let part1 = instructions.reduce((stacks, instruction) => moveReversed(stacks, instruction), stacks)
let part2 = instructions.reduce((stacks, instruction) => moveTogether(stacks, instruction), stacks)

console.log(getStackCode(part1))
console.log(getStackCode(part2))
