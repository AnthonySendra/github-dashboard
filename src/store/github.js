import { createReducer } from 'reduxsauce'

const Types = {
  SET_TOKEN: 'SET_TOKEN',
  SET_REPOSITORIES: 'SET_REPOSITORIES'
}

const initState = {
  token: null,
  repositories: null
}

const setTokenReducer = (state, action) => ({ token: action.token })
const setRepositoriesReducer = (state, action) => ({ repositories: action.repositories })

export const creators = {
  setToken: token => ({ type: Types.SET_TOKEN, token }),
  setRepositories: repositories => ({ type: Types.SET_REPOSITORIES, repositories })
}

export default createReducer(initState, {
  [Types.SET_TOKEN]: setTokenReducer,
  [Types.SET_REPOSITORIES]: setRepositoriesReducer
})
