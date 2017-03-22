function type(check) {
  return function(value) {
    if (type.cache.get(value) === check) {
      return value
    }

    if (!check(value)) {
      throw 'Moss type mismatch'
    }

    if (typeof value === 'object') {
      type.cache.set(value, check)
    }
    return value
  }
}

type.cache = new WeakMap()

describe('type-checking', function() {
  var Number = type(function(thing) {
    return typeof thing === 'number'
  })

  var unicornChecks
  beforeEach(function() {
    unicornChecks = 0
  })
  var Unicorn = type(function(thing) {
    unicornChecks++
    return thing.horns === 1
  })

  it('acts as the identity function for values of the type', function() {
    expect(Number(1)).toBe(1)
    expect(Number(2)).toBe(2)
  })

  it('throws for values that do not match the type', function() {
    expect(function() { Number('foo') }).toThrow()
  })

  it('caches the results', function() {
    var stove = {horns: 1}
    Unicorn(stove)
    Unicorn(stove)
    expect(unicornChecks).toBe(1)
  })
})
