import { input } from '../input/11.mjs'

const parseMonkey = ([_, items, operation, test, trueThrow, falseThrow]) => {
  const testMod = parseInt(test.split(' ').pop(), 10)
  const trueTarget = parseInt(trueThrow.split(' ').pop(), 10)
  const falseTarget = parseInt(falseThrow.split(' ').pop(), 10) 
  const opParts = operation.split(' ')
  const val = opParts.pop()
  const op = opParts.pop() == '+' ? (a, b) => a + b : (a, b) => a * b
  const operationFn = val == 'old' 
    ? worry => op(worry, worry) 
    : worry => op(worry, parseInt(val, 10))

  return {
    items: items.split(': ')[1].split(', ').map( i => parseInt(i, 10) ),
    operation: operationFn,
    mod: testMod,
    test: worry => worry % testMod == 0 ? trueTarget : falseTarget,
    count: 0
  }
}

const monkeys = input
  .trim()
  .split('\n\n')
  .map( blob => blob.split('\n') )
  .map(parseMonkey)

const LCM = monkeys.reduce((lcm, monkey) => lcm * monkey.mod, 1)

for (let round = 0; round < 10000; round++) {
  monkeys.forEach( monkey => {
    while (monkey.items.length > 0) {
      let item = monkey.operation(monkey.items.shift()) % LCM
      monkeys[ monkey.test(item) ].items.push(item)
      monkey.count++
    }
  })
}

let [first, second] = monkeys.map(m => m.count).sort((a, b) => b - a).map(i => BigInt(i))
console.log(first * second)
