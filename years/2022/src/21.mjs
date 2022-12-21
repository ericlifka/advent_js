import { input } from '../input/21.mjs'

let monkeys = { }
input.trim().split('\n')
  .map( line => line.split(': ') )
  .forEach(([monkey, expr]) => monkeys[monkey] = 
    /^\d+$/.test(expr) ? parseInt(expr, 10) : expr.split(' '))

const expressions = { '+': (l, r) => l + r, '-': (l, r) => l - r
                    , '*': (l, r) => l * r, '/': (l, r) => l / r }

const lReverseExpressions = { '+': (l, r) => l - r, '-': (l, r) => r - l
                            , '*': (l, r) => l / r, '/': (l, r) => r / l }

const rReverseExpressions = { '+': (l, r) => l - r, '-': (l, r) => l + r
                            , '*': (l, r) => l / r, '/': (l, r) => l * r }

let cache = {}
const getMonkeyExpr = monkey => {
  if (cache[monkey] == undefined) {
    if (typeof monkeys[monkey] == "number"|| monkeys[monkey] == 'X') {
      cache[monkey] = monkeys[monkey]
    } else {
      let [left, expr, right] = monkeys[monkey]
      let [leftResult, rightResult] = [getMonkeyExpr(left), getMonkeyExpr(right)]
      cache[monkey] = (typeof leftResult == 'number' && typeof rightResult == 'number')
        ? expressions[expr](leftResult, rightResult)
        : [expr, leftResult, rightResult]
    }
  }
  return cache[monkey]
}

const unwindEquation = (resultVal, equation) => {
  while (true) {
    let [symbol, left, right] = equation

    equation = typeof left == 'number' ? right : left
    resultVal = typeof left == 'number' 
      ? lReverseExpressions[symbol](resultVal, left) 
      : rReverseExpressions[symbol](resultVal, right)

    if (equation == 'X')
      return resultVal
  }
}

console.log('part1', getMonkeyExpr('root'))
cache = { }
monkeys['root'][1] = '='
monkeys['humn'] = 'X'
let [eql, equation, result] = getMonkeyExpr('root')
console.log('part2', unwindEquation(result, equation))
