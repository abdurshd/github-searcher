import {useEffect, useState} from 'react';

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers()
   }, []);

  const fetchUsers =  async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`,{
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    })
  

  const data = await res.json()
  setUsers(data);
  setLoading(false)
  }

  return (
  <div>
    {loading ? (
    <h1>Loading...</h1>
    ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {users.map((user) => (
        <h1>{user.login}</h1>))
        }   
    </div>)}
    </div>
  );
      }; 

export default UserResults
