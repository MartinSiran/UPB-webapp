import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Alert from 'react-bootstrap/Alert';



const Logged = () => {


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
      console.log(res)
      if(res.data.loggedIn == false){
        // setLoginStatus(res.data.user)
        console.log("zle")
      }
    })
  }, [])

  return (
    <p>Ahoj</p>
  )
}

export default Logged