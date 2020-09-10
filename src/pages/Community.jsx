  
import React,{ useEffect, useState} from 'react';
import axios from "axios";
import { withAuth } from "../lib/Auth";
// import { Link } from "react-router-dom";
// import Loader from '../components/Loader'



const Community = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
    .get(process.env.REACT_APP_API_URL + "/users/allusers", { withCredentials: true })
    .then((response) => setUsers( response.data ));
    
  }, [])
  return (
    <div>
      <h1>community</h1>
      <hr/>
      {
        users.map((x,i)=> <h3 key={i}>{x.username}</h3> )
      }
    </div>
  )
}

export default withAuth(Community);
