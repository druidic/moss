describe('types', function() {
  var Num = type(function(thing) {
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
    expect(Num(1)).toBe(1)
    expect(Num(2)).toBe(2)
  })

  it('throws for values that do not match the type', function() {
    expect(function() { Num('foo') }).toThrow()
  })

  it('caches the results', function() {
    var stove = {horns: 1}
    Unicorn(stove)
    Unicorn(stove)
    expect(unicornChecks).toBe(1)
  })
})

describe('checking types', function() {
  var Num = type(function(thing) {
    return typeof thing === 'number'
  })

  it('checks a simple type', function() {
    expect(type.check(3, Num)).toBe(3)
    expect(function() {
      type.check('foo', Num)
    }).toThrow()
  })

  it('checks an array type', function() {
    expect(type.check([1], [Num])).toEqual([1])
    expect(type.check([], [Num])).toEqual([])
  })

  it('checks an array type against a non-array', function() {
    expect(function() { type.check(1, [Num]) }).toThrow()
  })

  it('checks an array type where an element does not match', function() {
    expect(function() { type.check([1, 2, 'kablooie'], [Num]) }).toThrow()
  })

  it('requires array types to have one element', function() {
    expect(function() { type.check([], []) }).toThrow()
  })

  it('checks an object type', function() {
    var objType = {
      a: Num,
      b: Num
    }

    var good = {
      a: 1,
      b: 2
    }

    var missingProp = {
      a: 1
    }

    var wrongType = {
      a: 'foo',
      b: 2
    }

    expect(type.check(good, objType)).toBe(good)
    expect(function() { type.check(missingProp, objType) }).toThrow()
    expect(function() { type.check(wrongType, objType) }).toThrow()
  })

  it('allows extra properties on objects', function() {
    /* Objects with extra properties are allowed because
     * they are still Liskov-substitutable for values
     * with the exact set of properties required by the
     * type.
     */
    var objType = {
      a: Num,
      b: Num
    }

    var extraProp = {
      a: 1,
      b: 2,
      c: 3
    }

    expect(type.check(extraProp, objType)).toBe(extraProp)
  })
})
