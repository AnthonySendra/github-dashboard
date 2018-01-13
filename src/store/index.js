import { compose, createStore } from 'redux'
import reducers from './reducers'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'

const persistedReducers = compose(mergePersistedState())(reducers)
const storage = adapter(window.localStorage)
const enhancer = compose(persistState(storage, 'githubToken'))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(persistedReducers, {}, composeEnhancers(enhancer))
