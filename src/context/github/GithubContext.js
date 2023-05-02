import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext();


export const GithubProvider = ({children}) => {
const initialState = {
  users: [],
  user: {},
  repos: [],
  loading: false,
}

const [state, dispatch] = useReducer(githubReducer, initialState);

// search users


// Get single user

  return <GithubContext.Provider value={{
    ...state, dispatch
  }}>
    {children}
  </GithubContext.Provider>
    
  
}

export default GithubContext;
