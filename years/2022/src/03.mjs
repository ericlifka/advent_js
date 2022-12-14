import { input } from '../input/03.mjs'

const bags = input
  .trim()
  .split('\n')
  .map( line => line.split('') )

const set = s => new Set(s)
const mid = a => a.length / 2
const first = s => [...s][0]
const sum = (a, b) => a + b

const intersection = (a, b) =>
  set( [...a].filter( n => b.has(n) ))

const a = 'a'.charCodeAt(0)
const A = 'A'.charCodeAt(0)
const Z = 'Z'.charCodeAt(0)

const score = ( ch, _, __
              , ascii = ch.charCodeAt(0) ) =>
  ascii <= Z
    ? ascii - A + 27
    : ascii - a + 1

let part1 = bags
  .map( arr => [ arr.slice(0, mid(arr))
               , arr.slice(mid(arr)) ] )
  .map( group => group.map(set) )
  .map( bag => bag.reduce(intersection) )
  .map(first)
  .map(score)
  .reduce(sum)

console.log(part1)

let part2 = bags
  .reduce( ( groups, bag, _, __
           , last = groups[groups.length - 1] ) => 
              ( last.length < 3 ? last.push(bag) : groups.push([ bag ])
              , groups )
         , [[]] )
  .map( group => group.map(set) )
  .map( group => group.reduce(intersection) )
  .map(first)
  .map(score)
  .reduce(sum)

console.log(part2)
