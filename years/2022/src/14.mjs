import { input } from '../input/14.mjs'

let cave = { }, bounds = { xmin: Number.MAX_SAFE_INTEGER, ymin: 0, xmax: 0, ymax: 0 }
const cap = v => v < 0 ? -1 : v > 0 ? 1 : 0
const getKey = (x, y) => `< ${x}, ${y} >`
const createKey = (x, y) => {
  bounds = { xmin: Math.min(bounds.xmin, x), xmax: Math.max(bounds.xmax, x)
           , ymin: Math.min(bounds.ymin, y), ymax: Math.max(bounds.ymax, y) }
  return getKey(x, y)
}

input.trim()
  .split('\n')
  .map( line => line
    .split(' -> ')
    .map( pair => pair.split(',').map( v => parseInt(v, 10) )))
  .forEach(([[x, y], ...path]) => {
    cave[createKey(x, y)] = '#'
    while (path.length > 0) {
      let [tx, ty] = path.shift()
      let dx = cap(tx - x),  dy = cap(ty - y)
      while (x != tx || y != ty) {
        x += dx, y += dy
        cave[createKey(x, y)] = '#'
      }
    }
  })

let count = 0
while (true) {
  let sx = 500, sy = 0
  while (true) {
    if      (sy == bounds.ymax + 1)         break
    else if (!cave[getKey(sx, sy + 1)])     sy += 1
    else if (!cave[getKey(sx - 1, sy + 1)]) sy += 1, sx -= 1
    else if (!cave[getKey(sx + 1, sy + 1)]) sy += 1, sx += 1
    else                                    break
  }
  cave[getKey(sx, sy)] = 'o', count++
  if (sy == 0) break
}

console.log(count)
