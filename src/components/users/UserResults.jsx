import {useContext, useEffect} from 'react';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

const UserResults = () => {
const {users, loading, fetchUsers} = useContext(GithubContext);

  useEffect(() => {
     fetchUsers()  
   }, []);



  return (
    <div>
      {loading ? 
      (<Spinner/>
      ) : (
<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {Array.isArray(users) && users.map((user) => (
        <UserItem key={user.id} user={user}/>))
        }
        
    </div>
      ) }
    </div>
  )
}

export default UserResults
