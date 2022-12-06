import { stream } from '../input/06.mjs'

const anyMatch = (...chars) =>
  chars.sort().reduce( (matched, ch, i) => 
                          matched || ch == chars[i + 1]
                     , false)

const findStart = ( stream, buffer, count ) =>
  !anyMatch(...buffer)
    ? count
    : findStart( stream.slice(1), [...buffer.slice(1), stream[0]], count + 1)

console.log(findStart(stream.slice(4), stream.slice(0, 4), 4))
console.log(findStart(stream.slice(14), stream.slice(0, 14), 14))
