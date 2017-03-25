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

type.check = function(thing, t) {
  if (t instanceof Array) {
    if (t.length !== 1) {
      throw 'Array types must have a single element specifying the type that the array can contain.'
    }

    if (!(thing instanceof Array)) {
      throw 'Moss type mismatch'
    }

    for (var i = 0; i < thing.length; i++) {
      type.check(thing[i], t[0])
    }

    return thing
  }

  if (typeof t === 'object') {
    var actualKeys = Object.keys(thing)
    var expectedKeys = Object.keys(t)

    if (actualKeys.length < expectedKeys.length) {
      throw 'Moss type mismatch'
    }

    for (var i = 0; i < expectedKeys.length; i++) {
      var key = expectedKeys[i]
      type.check(thing[key], t[key])
    }

    return thing
  }

  return t(thing)
}
