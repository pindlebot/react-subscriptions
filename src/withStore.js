import React from 'react'
import createStore from './createStore'

export default (initialState = {}) => Component =>
  class WrappedComponent extends React.Component {
    constructor (props) {
      super(props)

      this.store = createStore({
        ...initialState,
        ...this.props
      })
      this.state = this.store.getState()
    }

    componentDidMount = () => {
      Object.keys(this.props).forEach(key => {
        this.store.subscribe(key, this.callback(key))
      })
    }

    componentWillUnmount = () => {
      Object.keys(this.props).forEach(key => {
        this.store.unsubscribe(key, this.callback(key))
      })
    }

    componentWillReceiveProps = (nextProps) => {
      Object.keys(nextProps).forEach(key => {
        this.store.update(key, nextProps[key])
      })
    }

    callback = key => value => {
      this.setState({ [key]: value })
    }

    render () {
      return (
        <Component
          {...this.state}
          store={this.store}
        />
      )
    }
  }
