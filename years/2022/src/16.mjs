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

const findPaths = (minutes, pressure = 0, visited = new Set()) => {
  let queue = [{ node: 'AA', minutes, pressure, visited }]
  let paths = [ ]
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
      paths.push([ pressure, visited])
    }
  }
  return paths  
}

let start = Date.now()
let part1 = findPaths(30).sort(([l], [r]) => r - l)
let p1checkpoint = Date.now()
console.log('part1: ', part1[0])
console.log('\ttotal paths found:', part1.length)
console.log('\t', (p1checkpoint - start)/60000, 'm')

let longestPath = [ 0, new Set() ]
findPaths(26)
  .forEach(([ pressure, visited ]) => {
    let elephantPaths = findPaths(26, pressure, visited).sort(([l], [r]) => r - l)
    console.log('\t\tfound ', elephantPaths.length, 'elephant paths')
    if (elephantPaths[0][0] > longestPath[0]) {
      longestPath = elephantPaths[0]
    }
  })

console.log('part2:', longestPath)
console.log('\t', (Date.now() - p1checkpoint)/60000, 'm')
