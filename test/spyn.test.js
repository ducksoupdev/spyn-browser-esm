/* global describe it chai */
import spyn from '../dist/spyn.esm.js'
const { spy, calls, original } = spyn

const sum3 = (a, b, c = 0) => a + b + c

describe('Spyn tests', () => {
  it('spy that has not been called', () => {
    const spied = spy(sum3)
    chai.expect(calls(spied)).to.deep.equal([])
  })

  it('spy that has been called once', () => {
    const spied = spy(sum3)
    spied(40, 2)
    chai.expect(calls(spied)).to.deep.equal([{
      arguments: [40, 2],
      return: 42
    }])
  })

  it('spy that has been called twice', () => {
    const spied = spy(sum3)
    spied(40, 2)
    spied(40, 3, -1)
    chai.expect(calls(spied)).to.deep.equal([
      { arguments: [40, 2], return: 42 },
      { arguments: [40, 3, -1], return: 42 }
    ])
  })

  it('getting the original function from a spy', () => {
    const spied = spy(sum3)
    chai.expect(spied).to.not.equal(sum3)
    chai.expect(original(spied)).to.equal(sum3)
  })

  it('getting the original fn of a non spy will throw', () => {
    chai.expect(() => original(() => undefined)).to.throw()
  })

  it('getting the calls of a non spy will throw', () => {
    chai.expect(() => calls(() => undefined)).to.throw()
  })
})
