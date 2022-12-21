import { input } from '../input/21.mjs'

let monkeys = { }
input.trim().split('\n')
  .map( line => line.split(': ') )
  .forEach(([monkey, expr]) =>
    monkeys[monkey] = 
    /^\d+$/.test(expr)
        ? parseInt(expr, 10)
        : expr.split(' '))

const expressions = { '+': (l, r) => l + r
                    , '-': (l, r) => l - r
                    , '*': (l, r) => l * r
                    , '/': (l, r) => l / r 
                    , '=': (l, r) => l == r }

let cache = {}
const getMonkeyExpr = monkey => {
  if (cache[monkey] != undefined) {
    return cache[monkey]
  }
  else if (typeof monkeys[monkey] == "number"|| monkeys[monkey] == 'X') {
    return cache[monkey] = monkeys[monkey]
  } else {
    let [left, expr, right] = monkeys[monkey]
    let leftResult = getMonkeyExpr(left)
    let rightResult = getMonkeyExpr(right)
    if (typeof leftResult == 'number' && typeof rightResult == 'number') {
      return cache[monkey] = expressions[expr](leftResult, rightResult)
    } else {
      return cache[monkey] = [expr, leftResult, rightResult]
    }
  }
}

const unwindEquation = (resultVal, equation) => {
  while (true) {
    let [symbol, left, right] = equation

    switch (symbol) {
      case '+':
        if (typeof left == 'number') {
          resultVal = resultVal - left
          equation = right
        } else {
          resultVal = resultVal - right
          equation = left
        }
        break
      case '*':
        if (typeof left == 'number') {
          resultVal = resultVal / left
          equation = right
        } else {
          resultVal = resultVal / right
          equation = left
        }
        break
      case '-':
        if (typeof left == 'number') {
          resultVal = left - resultVal
          equation = right
        } else {
          resultVal = resultVal + right
          equation = left
        }
        break
      case '/':
        if (typeof left == 'number') {
          resultVal = left / resultVal
          equation = right
        } else {
          resultVal = resultVal * right
          equation = left
        }
        break
    }

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
