import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Alert from 'react-bootstrap/Alert';
import {useNavigate, Link} from 'react-router-dom';
import SharedFiles from './SharedFiles';
import CryptoForm from './CryptoForm'
import FileShare from './FileShare';
import CommentForm from './CommentForm';
import Reservation from './Reservation'



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
      <p>Logged as {loggedUser} <Link onClick={logUserOut}  to="/">Logout</Link></p>
      <FileShare/>
      <SharedFiles userId={loggedUserId}/>
      <h1>Encrypting</h1>
      <CryptoForm action="encrypt" keyType="public"/>
      <h1>Decrypting</h1>
      <CryptoForm action="decrypt" keyType="private"/>
      <Reservation loggedUser={loggedUser}/>
    </div>
  )
}

export default Logged
