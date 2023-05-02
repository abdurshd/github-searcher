import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
const initialState = {
  users: [],
  user: {},
  repos: [],
  loading: false,
}

const [state, dispatch] = useReducer(githubReducer, initialState);

// search users
const searchUsers =  async (text) => {
  const params = new URLSearchParams({
    q: text
  })
  dispatch({
    type: 'SET_LOADING'
  })
  const res = await fetch(`${GITHUB_URL}/search/users?${params}`,{
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

const {items} = await res.json()

dispatch({
  type: 'GET_USERS',
  payload: items,
})
}

// Get single user
const getUser =  async (login) => {
  dispatch({
    type: 'SET_LOADING'
  })

  const res = await fetch(`${GITHUB_URL}/users/${login}`,{
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })
if (res.status === 404) {
  window.location = '/notfound'
} else {
const data = await res.json()

dispatch({
  type: 'GET_USER',
  payload: data,
})
}
}

//Get user repos
const getUserRepos =  async (login) => {
  const params = new URLSearchParams({
    sort: 'created' ,
    per_page: 10
  })
  dispatch({
    type: 'SET_LOADING'
  })
  const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

const data = await res.json()

dispatch({
  type: 'GET_REPOS',
  payload: data,
})
}
  return <GithubContext.Provider value={{
    users: state.users, user: state.user, loading: state.loading, repos: state.repos, searchUsers, dispatch, getUser, getUserRepos
  }}>
    {children}
  </GithubContext.Provider>
    
  
}

export default GithubContext;
