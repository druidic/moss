function App(launch, stateSchema) {
  if (typeof launch !== 'function') {
    throw 'Value "' + launch + '" is not a valid launch function.'
  }

  if (typeof stateSchema !== 'object') {
    throw 'Value "' + stateSchema + '" is not a valid state schema.'
  }

  var state = {}
  launch(state)
  var error = validateStateAgainstSchema(state, stateSchema)

  return {
    display: display,
    keyDown: keyDown
  }

  function display() {
    if (error) {
      return error
    }
    return state.display()
  }

  function keyDown(event) {
    (state.onKeyDown || function() {})(event)
  }
}

function validateStateAgainstSchema(state, schema) {
  if (state.foo) return 'State variable `foo` is not in the schema.'
}
