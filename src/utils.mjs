
Array.prototype.map2d = function (cb) {
  return this.map((row, y) =>
    row.map((val, x) =>
      cb(val, y, x, this)))
}

Array.prototype.reduce2d = function (cb, startAccum) {
  return this.reduce((_accum, row, y) =>
    row.reduce((accum, val, x) => cb(accum, val, y, x, this)
  , _accum), startAccum)
}
