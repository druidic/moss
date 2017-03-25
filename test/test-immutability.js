Object.prototype.with = function(newProperties) {
    return Object.assign({}, this, newProperties)
}

Object.prototype.without = function(prop) {
  var newObj = Object.assign({}, this)
  delete newObj[prop]
  return newObj
}

Array.prototype.with = function(item) {
  var copy = this.slice()
  copy.push(item)
  return copy
}

Array.prototype.withPrepended = function(item) {
  var copy = this.slice()
  copy.unshift(item)
  return copy
}

describe('Immutability helpers on Object', function() {
  it('sets a property', function() {
    var o = {a: 1}
    expect(o.with({a: 2})).toEqual({a: 2})
    expect(o).toEqual({a: 1})
  })

  it('adds a new property', function() {
    var o = {a: 1}
    expect(o.with({b: 2})).toEqual({a: 1, b: 2})
    expect(o).toEqual({a: 1})
  })

  it('deletes a property', function() {
    var o = {a: 1, b: 2}
    expect(o.without('b')).toEqual({a: 1})
    expect(o).toEqual({a: 1, b: 2})
  })
})

describe('Immutability helpers on Array', function() {
  it('appends an item', function() {
    var a = [1]
    expect(a.with(2)).toEqual([1, 2])
    expect(a).toEqual([1])
  })

  it('prepends an item', function() {
    var a = [1]
    expect(a.withPrepended(2)).toEqual([2, 1])
    expect(a).toEqual([1])
  })
})
