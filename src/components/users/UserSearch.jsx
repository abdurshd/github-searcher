import { useContext, useState } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import {searchUsers} from '../../context/github/GithubActions'

const UserSearch = () => {
    const [text, setText] = useState('');
    const {users,  dispatch} = useContext(GithubContext)
    const {setAlert} = useContext(AlertContext)


    const handleChange =(e) => setText(e.target.value);
    const handleSubmit = async (e)=> {
        e.preventDefault();
    if (text === "") {
        setAlert("pls, type sth :( ", 'error')
    } else {
        dispatch({type: 'SET_LOADING'})
        const users = await searchUsers(text)
        dispatch({type: 'GET_USERS', payload: users})
        setText('')
    }
    }
    const handleClick = () => {
        dispatch({
            type: 'CLEAR'
        })
    }
    


  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
<div>
    <form onSubmit={handleSubmit}>
        <div className="form-control">
            <div className="relative">
                <input onChange={handleChange} type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" placeholder="Search"/>
                <button  className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg" type="submit">Go</button>
            </div>
        </div>
    </form>
</div>
{users && Array.isArray(users) && users.length > 0 && (
    <div>
       <button onClick={handleClick} className="btn btn-ghost btn-lg">
          Clear
         </button>
    </div>
)}

</div>
  )
}

export default UserSearch
