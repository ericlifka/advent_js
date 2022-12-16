import { input } from '../input/16.mjs'

let network = {}
let importantValves = [ 'AA' ]
input.trim().split('\n')
  .map( line => line.match(/Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)/) )
  .map(([ _, valve, rate, connections ]) => [ valve, parseInt(rate, 10), connections.split(', ') ])
  .forEach(([ valve, rate, connections ]) => {
    network[valve] = { valve, rate, connections }
    if (rate > 0) {
      importantValves.push(valve)
    }
  })

// console.log(network)
// console.log(importantValves)

// console.log(importantValves.map( valve => [ valve, network[valve].rate ]).sort(([vl, l], [vr, r]) => l - r))

const shortestPath = (start, end) => {
  let seen = new Set([start])
  let queue = [ [start, 0] ]
  while (queue.length > 0) {
    let [node, steps] = queue.shift()
    if (node == end) {
      return steps
    } else {
      seen.add(node)
    }
    network[node].connections.forEach( connection => {
      if (!seen.has(connection)) {
        queue.push([connection, steps + 1])
      }
    })
  }
}

let importantNetwork = {}
importantValves.forEach( valve => {
  // console.log('precalculating' , valve)
  let connections = []
  importantValves.forEach( other => {
    if (other != valve) {
      connections.push([ other, shortestPath(valve, other) ])
    }
  })
  importantNetwork[valve] = connections
})

let queue = [ {node: 'AA', minutes: 30, pressure: 0, visited: new Set()} ]
let paths = []

while (queue.length > 0) {
  let {node, minutes, pressure, visited} = queue.shift()
  let count = 0
  importantNetwork[node].forEach(([other, distance]) => {
    if (!visited.has(other) && distance < minutes) {
      let newTime = minutes - distance - 1
      queue.push({
        node: other,
        minutes: newTime,
        pressure: pressure + newTime * network[other].rate,
        visited: new Set([...visited, other])
      })
      count++
    }
  })
  if (count == 0) {
    console.log('path found: ', pressure, ' - ', visited)
    paths.push([ pressure, visited])
  }
}

paths.sort(([l], [r]) => r - l)
console.log('paths found: ', paths.length)
console.log('best path: ', paths[0])
// console.log(paths)
