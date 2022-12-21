import { input } from '../input/19.mjs'

const blueprints = input
  .trim().split('\n')
  .map( line => line.match(/Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./) )
  .map(([_, ...values]) => values.map( v => parseInt(v, 10)))
  .map(([ id, oreOre, claOre, obsOre, obsCla, geoOre, geoObs ]) =>  ({ id, oreOre, claOre, obsOre, obsCla, geoOre, geoObs }))

const baseState = () => ({
  minutes: 0,
  resources: { ore: 0, cla: 0, obs: 0, geo: 0 },
  bots: { ore: 1, cla: 0, obs: 0, geo: 0 }
})
const cloneState = (state = baseState()) => ({
  minutes: state.minutes,
  resources: {...state.resources},
  bots: {...state.bots}
})
const stepState = state => {
  state.minutes += 1
  state.resources.ore += state.bots.ore
  state.resources.cla += state.bots.cla
  state.resources.obs += state.bots.obs
  state.resources.geo += state.bots.geo
}

const testBlueprint = (blueprint, target) => {
  let maxOreBots = Math.max(blueprint.oreOre, blueprint.claOre, blueprint.obsOre, blueprint.geoOre)
  let maxClaBots = blueprint.obsCla
  let maxObsBots = blueprint.geoObs
  let queue = [ baseState() ]
  let thresholds = new Array(target).fill(0)
  let maxGeo = { resources: { geo: 0 } }
  while (queue.length > 0) {
    let state = queue.shift()
    let newStates = []

    if (state.bots.obs >= 1) {
      let buildGeoState = cloneState(state)
      while (buildGeoState.resources.ore < blueprint.geoOre || buildGeoState.resources.obs < blueprint.geoObs)
        stepState(buildGeoState)
      
      if (buildGeoState.minutes < target) {
        stepState(buildGeoState)
        buildGeoState.resources.ore -= blueprint.geoOre
        buildGeoState.resources.obs -= blueprint.geoObs
        buildGeoState.bots.geo += 1
        buildGeoState.parent = state
        newStates.push(buildGeoState)
      }
    }

    if (state.bots.obs < maxObsBots && state.bots.cla >= 1) {
      let buildObsState = cloneState(state)
      while (buildObsState.resources.ore < blueprint.obsOre || buildObsState.resources.cla < blueprint.obsCla)
        stepState(buildObsState)

      if (buildObsState.minutes < target) {
        stepState(buildObsState)
        buildObsState.resources.ore -= blueprint.obsOre
        buildObsState.resources.cla -= blueprint.obsCla
        buildObsState.bots.obs += 1
        buildObsState.parent = state
        newStates.push(buildObsState)
      }
    }

    if (state.bots.cla < maxClaBots) {
      let buildClaState = cloneState(state)
      while (buildClaState.resources.ore < blueprint.claOre)
        stepState(buildClaState)

      if (buildClaState.minutes < target) {
        stepState(buildClaState)
        buildClaState.resources.ore -= blueprint.claOre
        buildClaState.bots.cla += 1
        buildClaState.parent = state
        newStates.push(buildClaState)
      }
    }

    if (state.bots.ore < maxOreBots) {
      let buildOreState = cloneState(state)
      while (buildOreState.resources.ore < blueprint.oreOre)
        stepState(buildOreState)

      if (buildOreState.minutes < target) {
        stepState(buildOreState)
        buildOreState.resources.ore -= blueprint.oreOre
        buildOreState.bots.ore += 1
        buildOreState.parent = state
        newStates.push(buildOreState)
      }
    }

    if (newStates.length == 0) {
      let gatherState = cloneState(state)
      while (gatherState.minutes < target)
        stepState(gatherState)

      gatherState.parent = state
      newStates.push(gatherState)
    }

    newStates.forEach( newState => {
      if (newState.minutes >= target) {
        if (newState.resources.geo > maxGeo.resources.geo)
          maxGeo = newState
      } else {
        if (newState.bots.geo >= (thresholds[newState.minutes - 1] || 0)) {
          for (let i = newState.minutes; i < thresholds.length; i++) {
            if (thresholds[i] < newState.bots.geo)
              thresholds[i] = newState.bots.geo
          }

          queue.push(newState)
        }
      }
    })
  }

  return maxGeo.resources.geo
}

let start = Date.now()
console.log('part1', blueprints.reduce((total, blueprint) => total + testBlueprint(blueprint, 24) * blueprint.id, 0))
let checkpoint = Date.now()
console.log((checkpoint - start)/1000, 's')
console.log('part2', blueprints.slice(0, 3).reduce((total, blueprint) => total * testBlueprint(blueprint, 32), 1))
console.log((Date.now() - start)/1000, 's')
