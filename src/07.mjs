import { output } from '../input/07.mjs'

const dir = (name, parent) => ({ name, parent, type: 'dir', children: {} })
const file = (name, parent, size) => ({ name, size, parent, type: 'file' })

let root = dir('/', null)
let current = root

const addNode = ([size, name]) =>
  current.children[name] = size == 'dir' 
                            ? dir(name, current)
                            : file(name, current, parseInt(size, 10))

const ls = results => 
  results.forEach( item => addNode(item.split(' ')) )

const cd = target =>
{ target == '/' ? current = root
: target == '..' ? current = current.parent
: current = current.children[target]
}

output
  .split('\n$ ')
  .map( group =>  group.split('\n') )
  .forEach(([cmd, ...results]) => cmd.startsWith('ls') ? ls(results)
                                : cmd.startsWith('cd') ? cd(cmd.split(' ')[1]) 
                                : null )

let targets = []
const findTargets = node => {
  if (node.type == 'file') return node.size
  else {
    let size = Object.keys(node.children).map( child => findTargets(node.children[child]) ).reduce((a, b) => a + b)
    targets.push([node.name, size])
    return size
  }
}

let rootSize = findTargets(root)
let freeSpace = 70000000 - rootSize
let minSize = 30000000 - freeSpace

console.log('p1: ', targets.filter(([_, s]) => s <= 100000).reduce((a, [_, b])=> a + b, 0))
console.log('p2: ', targets.filter(([_, s]) => s >= minSize).sort(([_, s1], [__, s2]) => s1 - s2)[ 0 ][ 1 ])
