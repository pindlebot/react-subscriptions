import React from 'react'
import createStore from './createStore'

export default (initialState = {}) => Component =>
  class WrappedComponent extends React.Component {
    constructor (props) {
      super(props)

      this.store = this.initStore(initialState)
      this.state = {
        ...initialState
      }
    }

    componentDidMount = () => {
      Object.keys(initialState).forEach(key => {
        this.store.subscribe(key, this.callback(key))
      })
    }

    componentWillUnmount = () => {
      Object.keys(initialState).forEach(key => {
        this.store.unsubscribe(key, this.callback(key))
      })
    }

    componentWillReceiveProps = (nextProps) => {
      Object.keys(initialState).forEach(key => {
        if (
          nextProps.hasOwnProperty(key) &&
          nextProps[key] !== this.store.get(key)
        ) {
          this.store.update(key, nextProps[key])
        }
      })
    }

    callback = key => value => {
      this.setState({ [key]: value })
    }

    initStore = (initialState) => createStore(
      Object.keys(initialState).reduce((acc, val) => ({
        ...acc,
        [val]: this.props[val] || initialState[val]
      }), {})
    )

    render () {
      return (
        <Component
          {...this.props}
          {...this.state}
          store={this.store}
        />
      )
    }
  }
