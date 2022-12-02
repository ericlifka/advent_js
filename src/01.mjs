import { input } from '../input/01.mjs'

let result = input
  .trim()
  .split('\n\n')
  .map( elf => elf.split('\n')
                  .map( num => parseInt(num, 10) )
                  .reduce( (a, b) => a + b, 0 ) )
  .sort( (a, b) => b - a )

console.log(result[0])
console.log(result[0] + result[1] + result[2])
