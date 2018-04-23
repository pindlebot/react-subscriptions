import React from 'react'
import TestRenderer from 'react-test-renderer';
import withStore from '../'

class TestComponent extends React.Component {

  state = {}

  componentDidMount = () => {
    this.props.store.subscribe('number', this.setNumber)
  }

  componentWillUnmount = () => {
    this.props.store.subscribe('number', this.setNumber)
  }

  setNumber = (number) => {
    this.setState({ number })
  }

  render () {
    console.log({
      props: this.props.number,
      state: this.state.number
    })
    return (
      <div></div>
    )
  }
}

const WrappedTestComponent = withStore(TestComponent)

class Example extends React.Component {

  state = {
    number: 0
  }

  componentDidMount = () => {
    this.tick()
  }

  tick = () => {
    this.timer = setTimeout(() => {
      this.setState({ number: Math.floor(Math.random() * 100) })
      this.tick()
    }, 1000)
  }

  render () {
    return (<WrappedTestComponent number={this.state.number} />)
  }
}

const testRenderer = TestRenderer.create(
  <Example />
)

// console.log(testRenderer.toJSON());