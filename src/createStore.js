// lifted from https://github.com/draft-js-plugins/draft-js-plugins

const createStore = (initialState = {}) => {
  let state = { ...initialState }
  const listeners = {}

  const subscribe = (key, callback) => {
    listeners[key] = listeners[key] || []
    listeners[key].push(callback)
  }

  const unsubscribe = (key, callback) => {
    if (listeners.hasOwnProperty(key)) {
      listeners[key] = listeners[key].filter((listener) => listener !== callback)
    } else {
      console.warn(`No listener with key ${key}`)
    }
  }

  const update = (key, item) => {
    state = {
      ...state,
      [key]: item
    }
    if (listeners[key]) {
      listeners[key].forEach((listener) => listener(state[key]))
    }
  }

  const get = (key) => state[key]

  const getState = () => state

  return {
    getState,
    subscribe,
    unsubscribe,
    update,
    get
  }
}

export default createStore
