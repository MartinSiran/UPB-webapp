import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Alert from 'react-bootstrap/Alert';
import {useNavigate, Link} from 'react-router-dom';
import SharedFiles from './SharedFiles';



const Logged = () => {

  function logUserOut(){
    axios.get(`${process.env.REACT_APP_API_HOST}/login/logout`);
  }
  const [loggedUser, setLoggedUser] = useState('');
  const [loggedUserId, setLoggedUserId] = useState('');

  let navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
      console.log(res)
      if(res.data.loggedIn == false){
        // setLoginStatus(res.data.user)
        console.log("zle")
        navigate("/")
      }
      console.log("mmmm", res.data)
      setLoggedUser(res.data.user)
      setLoggedUserId(res.data.userId)
    })
  }, [])

  return (
    <div>
      <p>Ahoj {loggedUser} {loggedUserId}</p>
      <SharedFiles userId={loggedUserId}/>
      <Link onClick={logUserOut}  to="/">Logout</Link>
    </div>
  )
}

export default Logged
