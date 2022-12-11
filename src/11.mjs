const monkeys = 
[ { items: [ 72, 97 ]
  , operation: worry => worry * 13
  , test: worry => worry % 19 == 0 ? 5 : 6 }

, { items: [ 55, 70, 90, 74, 95 ]
  , operation: worry => worry * worry
  , test: worry => worry % 7 == 0 ? 5 : 0 }

, { items: [ 74, 97, 66, 57 ]
  , operation: worry => worry + 6
  , test: worry => worry % 17 == 0 ? 1 : 0 }

, { items: [ 86, 54, 53 ]
  , operation: worry => worry + 2
  , test: worry => worry % 13 == 0 ? 1 : 2 }

, { items: [ 50, 65, 78, 50, 62, 99 ]
  , operation: worry => worry + 3
  , test: worry => worry % 11 == 0 ? 3 : 7 }

, { items: [ 90 ]
  , operation: worry => worry + 4
  , test: worry => worry % 2 == 0 ? 4 : 6 }

, { items: [ 88, 92, 63, 94, 96, 82, 53, 53 ]
  , operation: worry => worry + 8
  , test: worry => worry % 5 == 0 ? 4 : 7 }

, { items: [ 70, 60, 71, 69, 77, 70, 98 ]
  , operation: worry => worry * 7
  , test: worry => worry % 3 == 0 ? 2 : 3 }
]

monkeys.forEach( monkey => monkey.count = 0 )

for (let round = 0; round < 10000; round++) {
  if (round % 10 == 0) console.log(round)
  monkeys.forEach( monkey => {
    while (monkey.items.length > 0) {
      let item = monkey.operation(monkey.items.shift()) % 9699690
      monkeys[ monkey.test(item) ].items.push(item)
      monkey.count++
    }
  })
}

let _m = [...monkeys].sort((a, b) => b.count - a.count)
console.log(BigInt(_m[0].count) * BigInt(_m[1].count))
