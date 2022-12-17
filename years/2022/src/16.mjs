import { input } from '../input/16.mjs'

let network = {}
let usefulValves = [ 'AA' ]
let usefulValveNetwork = {}

const shortestPath = (start, end) => {
  let seen = new Set([start]), queue = [ [start, 0] ]
  while (queue.length > 0) {
    let [node, steps] = queue.shift()
    if (node == end) return steps
    else seen.add(node)

    network[node].connections.forEach( connection => {
      if (!seen.has(connection)) queue.push([connection, steps + 1])
    })
  }
}

input.trim().split('\n')
  .map( line => line.match(/Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.*)/) )
  .map(([ _, valve, rate, connections ]) => [ valve, parseInt(rate, 10), connections.split(', ') ])
  .forEach(([ valve, rate, connections ]) => {
    network[valve] = { valve, rate, connections }
    if (rate > 0) usefulValves.push(valve)
  })

usefulValves.forEach( valve =>
  usefulValveNetwork[valve] = usefulValves.map( other => [ other, shortestPath(valve, other) ]).filter(([other]) => other != valve))

const findPaths = (minutes, pressure = 0, visited = new Set()) => {
  let paths = [ ], queue = [{ node: 'AA', minutes, pressure, visited }]
  while (queue.length > 0) {
    let any = false, {node, minutes, pressure, visited} = queue.shift()
    usefulValveNetwork[node].forEach(([other, distance]) => {
      if (!visited.has(other) && distance < minutes) {
        any = true
        let newMinutes = minutes - distance - 1
        let newPressure = pressure + newMinutes * network[other].rate
        queue.push({ node: other, minutes: newMinutes, pressure: newPressure, visited: new Set([...visited, other]) })
      }
    })
    if (!any) paths.push([ pressure, visited ])
  }
  return paths.sort(([l], [r]) => r - l)
}

let [part1] = findPaths(30)
console.log('part1: ', part1)

let longestPath = [ 0 ]
findPaths(26).forEach(([ pressure, visited ]) => {
  let [bestElephantPath] = findPaths(26, pressure, visited)
  if (bestElephantPath[0] > longestPath[0]) longestPath = bestElephantPath
})
console.log('part2:', longestPath)
