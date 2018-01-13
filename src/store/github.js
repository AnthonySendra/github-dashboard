import { createReducer } from 'reduxsauce'

const Types = {
  SET_TOKEN: 'SET_TOKEN'
}

const initState = {
  token: null
}

const setTokenReducer = (state, action) => ({ token: action.token })

export const creators = {
  setToken: token => ({ type: Types.SET_TOKEN, token })
}

export default createReducer(initState, {
  [Types.SET_TOKEN]: setTokenReducer
})
