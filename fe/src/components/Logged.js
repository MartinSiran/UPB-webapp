import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Alert from 'react-bootstrap/Alert';
import {useNavigate, Link} from 'react-router-dom';



const Logged = () => {

  function logUserOut(){
    axios.get(`${process.env.REACT_APP_API_HOST}/login/logout`);
  }
  const [loggedUser, setLoggedUser] = useState('');

  let navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
      console.log(res)
      if(res.data.loggedIn == false){
        // setLoginStatus(res.data.user)
        console.log("zle")
        navigate("/")
      }
      setLoggedUser(res.data.user)
    })
  }, [])

  return (
    <div>
    <p>Ahoj {loggedUser}</p>
    <Link onClick={() => logUserOut()} to="/">Logout</Link>  
    </div>
     
    
    // <Link  to="/">Logout</Link>      
  )
}

export default Logged