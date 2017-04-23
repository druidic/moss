describe('App', function() {
  it('demands a launch function', function() {
    expect(function() {
      App('not a function')
    }).toThrow('Value "not a function" is not a valid launch function.')
  })

  it('demands a state schema', function() {
    expect(function() {
      App(function() {})
    }).toThrow('Value "undefined" is not a valid state schema.')
  })

  it('can display a "hello world" message on launch', function() {
    function launch(state) {
      state.display = function() {
        return 'hello, world'
      }
    }
    expect(App(launch, {}).display()).toEqual('hello, world')
  })

  it('renders an error if properties are added to the state that are not in the schema', function() {
    function launch(state) {
      state.foo = 'bar'
    }
    expect(App(launch, {}).display()).toEqual('State variable `foo` is not in the schema.')
  })

  it('calls the keyDown handler when a key is pressed', function() {
    var onKeyDownSpy = jasmine.createSpy('onKeyDown')
    function launch(state) {
      state.onKeyDown = onKeyDownSpy
    }

    App(launch, {}).keyDown('dummy event')
    expect(onKeyDownSpy).toHaveBeenCalledWith('dummy event')
  })

  it('does not blow up when a key is pressed and no handler is defined', function() {
    function launch(state) {
    }

    expect(function() {
      App(launch, {}).keyDown('dummy event')
    }).not.toThrow()
  })
})

// format/overwrite at a particular coordinate pair
// format text at the time of printing
// needs to be testable
// criteria for test-drivability
//   - test needs to be clearly correct (though not exhaustive) before code
//     is written
//   - needs to be possible to write regression tests
//   - error messages need to be intelligible
//     - most straightforward way to show the error is just to print the screen

/*
test.display(displayEditor)
  .desc('highlighting selected text')
  .given({buffer: 'foo bar', selection: [4, 7]})
  .expectStyledAt(0, 0,
    'foo bar ',
    '    ^^^ ', {'^': {bg: 'pale-blue-4'}})
  .expectStyledAt(31, 0,
    fillRight('line 1, col 7, sel 3', ' '),
    fillRight('^^^^^^^^^^^^^^^^^^^^', '^'),
    {'^': footerFormat})


Display test "highlighting selected text" failed.
Type "13;" to view the actual display.

function displayMenu(output, state) {
  output.write(0, "line 1")
  output.write(1, "line 2")
}

screen.write("line 2")
screen.output
*/
