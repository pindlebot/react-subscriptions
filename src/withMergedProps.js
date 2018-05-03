import React from 'react'
import shallowEqual from 'fbjs/lib/shallowEqual'
import deepmerge from 'deepmerge'

const withMergedProps = Component => class extends React.Component {
  state = {}

  static getDerivedStateFromProps (nextProps, prevState) {
    const merged = deepmerge(prevState, nextProps, { arrayMerge: (a, b) => b })
    return shallowEqual(prevState, merged) ? null : merged
  }

  dispatch = state => {
    this.setState(state)
  }

  render () {
    return (
      <Component {...this.state} dispatch={this.dispatch} />
    )
  }
}

export default withMergedProps
