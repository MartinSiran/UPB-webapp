import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import CryptoForm from './components/CryptoForm'

const Abc = () => {
  const [res, setRes] = useState("")

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/users`).then(res => {
      const nieco = res.data;
      setRes(nieco);
    })
  }, [])

  return (
    <div>
      {res} - abc
    </div>
  )
}

function App() {
  return (
    <Container>
      <CryptoForm action="encrypt"/>
    </Container>
  );
}

export default App;
