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
      if(res.data.loggedIn == false){
        navigate("/")
      }
      setLoggedUser(res.data.user)
      setLoggedUserId(res.data.userId)
    })
  }, [])

  return (
    <div>
      <p>Ahoj {loggedUser}</p>
      <SharedFiles userId={loggedUserId}/>
      <Link onClick={logUserOut}  to="/">Logout</Link>
    </div>
  )
}

export default Logged
