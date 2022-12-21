import { input } from '../input/19.mjs'

const blueprints = input
  .trim().split('\n')
  .map( line => line.match(/Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./) )
  .map(([_, ...values]) => values.map( v => parseInt(v, 10)))
  .map(([ id, oreOre, claOre, obsOre, obsCla, geoOre, geoObs ]) =>  ({ id, oreOre, claOre, obsOre, obsCla, geoOre, geoObs }))

const runSim = (blueprint, target) => {
  const resetIgnoring = () => ({ ore: false, cla: false, obs: false, geo: false })
  const copyState = (state = {
    minutes: 0,
    resources: { ore: 0, cla: 0, obs: 0, geo: 0 },
    bots: { ore: 1, cla: 0, obs: 0, geo: 0 },
    ignoring: resetIgnoring()
  }) => ({ minutes: state.minutes, resources: {...state.resources}, bots: {...state.bots}, ignoring: {...state.ignoring} })
  
  let maxOreBots = Math.max(blueprint.oreOre, blueprint.claOre, blueprint.obsOre, blueprint.geoOre)
  let maxClaBots = blueprint.obsCla
  let maxGeoBots = blueprint.geoObs

  let queue = [ copyState() ]
  let maxGeodes = 0
  let maxSequence = null
  let thresholds = [ 0 ]
  while (queue.length > 0) {
    let state = queue.shift()
    let production = { ...state.bots }
    let newStates = [ ]

    if (state.resources.ore >= blueprint.geoOre && state.resources.obs >= blueprint.geoObs) {
      let buy = copyState(state)
      buy.resources.ore -= blueprint.geoOre
      buy.resources.obs -= blueprint.geoObs
      buy.bots.geo += 1
      buy.ignoring = resetIgnoring()
      buy.action = "Building Geode Cracker"
      newStates.push(buy)
    }
    else {
      if (!state.ignoring.obs && state.bots.geo < maxGeoBots && state.resources.ore >= blueprint.obsOre && state.resources.cla >= blueprint.obsCla) {
        let buy = copyState(state)
        buy.resources.ore -= blueprint.obsOre
        buy.resources.cla -= blueprint.obsCla
        buy.bots.obs += 1
        buy.ignoring = resetIgnoring()
        buy.action = "Building Obsidian miner"
        newStates.push(buy)
  
        let ignore = copyState(state)
        ignore.ignoring.obs = true
        newStates.push(ignore)
      }

      if (!state.ignoring.ore && state.bots.ore < maxOreBots && state.resources.ore >= blueprint.oreOre) {
        let buy = copyState(state)
        buy.resources.ore -= blueprint.oreOre
        buy.bots.ore += 1
        buy.ignoring = resetIgnoring()
        buy.action = "Building Ore gatherer"
        newStates.push(buy)
  
        let ignore = copyState(state)
        ignore.ignoring.ore = true
        newStates.push(ignore)
      }
  
      if (!state.ignoring.cla && state.bots.cla < maxClaBots && state.resources.ore >= blueprint.claOre) {
        let buy = copyState(state)
        buy.resources.ore -= blueprint.claOre
        buy.bots.cla += 1
        buy.ignoring = resetIgnoring()
        buy.action = "Building Clay gatherer"
        newStates.push(buy)
  
        let ignore = copyState(state)
        ignore.ignoring.cla = true
        newStates.push(ignore)
      }
    }

    if (newStates.length == 0) {
      newStates.push(copyState(state))
    }

    newStates.forEach( s => {
      s.minutes += 1
      s.resources.ore += production.ore
      s.resources.cla += production.cla
      s.resources.obs += production.obs
      s.resources.geo += production.geo
      s.parent = state

      if (s.minutes >= target) {
        if (s.resources.geo > maxGeodes) {
          maxGeodes = s.resources.geo
          maxSequence = s
          // console.log('new max geodes: ', maxGeodes, ' geode crackers: ', s.bots.geo, ' at minute: ', s.minutes)
        }
      }
      else {
        if (!thresholds[s.minutes] || thresholds[s.minutes] < s.bots.geo) {
          thresholds[s.minutes] = s.bots.geo
          // console.log('new threshold ', s.minutes, ':', s.resources.geo)
        }
        if (s.bots.geo >= (thresholds[s.minutes - 1] || 0)) {
          queue.push(s)
        }
      }
    })
  }

  let steps = []
  while (maxSequence) {
    let nextMax = maxSequence.parent
    delete maxSequence.parent
    steps.unshift(maxSequence)
    maxSequence = nextMax
  }
  // console.log(steps)
  // console.log('blueprint:', blueprint)
  console.log('max geodes:', maxGeodes)
  return maxGeodes
}

let start = Date.now()
let part1 = blueprints.slice(0, 3).reduce((total, blueprint, i, 
                              _, __ = console.log(`running blueprint ${blueprint.id}`)) => 
  runSim(blueprint, 32) * total, 1)
console.log(part1)
console.log((Date.now() - start)/1000, 's')
