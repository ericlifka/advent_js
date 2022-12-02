import { input } from '../input/02.mjs'

const rounds = input
  .trim()
  .split('\n')
  .map( line => line.split(' ') )

const handScore = hand => ({
  A: 1, B: 2, C: 3,
  X: 1, Y: 2, Z: 3,
})[ hand ]

// part1
const resultScore = result => result ==  1 || result == -2 ? 6 
                            : result == -1 || result ==  2 ? 0
                            : 3

const part1Score = ( opponent, player
                    , op = handScore(opponent)
                    , pl = handScore(player) ) => 
  resultScore(pl - op) + pl

let part1 = rounds
  .map(([op, pl]) => part1Score(op, pl))
  .reduce((a, b) => a + b, 0)

console.log(part1)

// part2
const shiftHand = (hand, shift) => ((handScore(hand) - 1) + shift) % 3 + 1

const part2Score = (op, round) => round == 'Z' ? 6 + shiftHand(op, 1)
                                : round == 'Y' ? 3 + shiftHand(op, 0)
                                : shiftHand(op, 2)

let part2 = rounds
  .map(([op, round]) => part2Score(op, round))
  .reduce((a, b) => a + b, 0)

console.log(part2)
