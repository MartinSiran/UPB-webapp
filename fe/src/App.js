import logo from './logo.svg';
import './App.css';
import axios, { Axios } from 'axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import CryptoForm from './components/CryptoForm'
import Registration from './components/Registration'
import Logged from './components/Logged';
import {Route, Routes} from "react-router-dom"

axios.defaults.withCredentials = true

const Abc = () => {
  const [res, setRes] = useState("")

  // useEffect(() => {
  //   // axios.get(`${process.env.REACT_APP_API_HOST}/users`).then(res => {
  //   //   const nieco = res.data;
  //   //   setRes(nieco);
  //   // })
  //   axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
  //     console.log(res)
  //   })
  // }, [])

  return (
    <div>
      abc
    </div>
  )
}

function App() {
  return (
    <Container>
      {/* <CryptoForm action="encrypt" keyType="public"/> */}
      <Routes>
        <Route exact path='/' element={<Registration/>}></Route>
        <Route path='/crypto' element={<CryptoForm action="encrypt" keyType="public"/>}></Route>
        <Route path='/logged' element={<Logged/>}></Route>

        {/* <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} /> */}
      </Routes>
    </Container>
  );
}

export default App;
