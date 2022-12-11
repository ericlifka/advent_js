import { input } from '../input/09.mjs'

const vec = (x, y) => ({x, y})
const key = v => `< ${v.x}, ${v.y} >`
const add = (a, b) => vec(a.x + b.x, a.y + b.y)
const subtract = (a, b) => vec(a.x - b.x, a.y - b.y)
const length = v => Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
const normalize = v => ({ x: v.x < 0 ? -1 : v.x > 0 ? 1 : 0
                        , y: v.y < 0 ? -1 : v.y > 0 ? 1 : 0 })
const ordinals =  { L: vec(-1,  0)
                  , R: vec( 1,  0)
                  , U: vec( 0, -1)
                  , D: vec( 0,  1) }

let head = vec(0, 0)
let tail = vec(0, 0)
let tailVisited = new Set([ key(tail) ])

const runStepP1 = (ord, count) => {
  while (count-- > 0) {
    head = add(head, ordinals[ord])
    let delta = subtract(head, tail)
    let distance = length(delta)
    if (distance >= 2) {
      tail = add(tail, normalize(delta))
      tailVisited.add(key(tail))
    }
  }
}

const o = () => vec(0, 0)
let rope = [ o(), o(), o(), o(), o(), o(), o(), o(), o(), o() ]
let ropeVisited = new Set([ key(o()) ])

const runStepP2 = (ord, count) => {
  while (count-- > 0) {
    rope[0] = add(rope[0], ordinals[ord])
    for (let i = 1; i < rope.length; i++) {
      let delta = subtract(rope[i - 1], rope[i])
      let distance = length(delta)
      if (distance >= 2) {
        rope[i] = add(rope[i], normalize(delta))
      }
    }
    ropeVisited.add(key(rope[rope.length - 1]))
  }
}

let instructions = input.trim().split('\n').map( line => line.split(' ') )
instructions.forEach(([ord, count]) => runStepP1(ord, parseInt(count, 10))) // part 1
instructions.forEach(([ord, count]) => runStepP2(ord, parseInt(count, 10))) // part 2

console.log(tailVisited.size, ropeVisited.size)
