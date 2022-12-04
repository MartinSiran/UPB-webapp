import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import PasswordChecklist from "react-password-checklist"
import Alert from 'react-bootstrap/Alert';
import {useNavigate, Link, Redirect} from 'react-router-dom';
import SharedFiles from './SharedFiles';
import CryptoForm from './CryptoForm'
import FileShare from './FileShare';
import CommentForm from './CommentForm';
import Reservation from './Reservation'
import ReservationList from './ReservationList';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Route, Routes} from "react-router-dom"

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
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/logged">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/logged/fileshare">Fileshare</Nav.Link>
            <Nav.Link href="/logged/sharedfiles">Shared files</Nav.Link>
            <Nav.Link href="/logged/encrypt">Encrypting</Nav.Link>
            <Nav.Link href="/logged/decrypt">Decrypting</Nav.Link>
            <Nav.Link href="/logged/reservation">Reservation</Nav.Link>
            <Nav.Link href="/logged/comment">Comments</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/fileshare' element={<FileShare/>}/>
        <Route path='/sharedfiles' element={<SharedFiles userId={loggedUserId}/>}/>
        <Route path='/encrypt' element={<CryptoForm action="encrypt" keyType="public"/>}/>
        <Route path='/decrypt' element={<CryptoForm action="decrypt" keyType="private"/>}/>
        <Route path='/reservation' element={<Reservation loggedUser={loggedUser}/>}/>
        <Route path='/comment' element={<CommentForm action="comment"/>}/>
      </Routes>

      <div class="mx-3">
        <p>Logged as {loggedUser} <Link onClick={logUserOut}  to="/">Logout</Link></p>
      </div>
    </>
  )

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
      <ReservationList/>
      <h1>Comments</h1>
      <CommentForm action="comment"/>
    </div>
  )
}

export default Logged
