import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Form from './components/Form'

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
    // <Button variant="primary">Click meeeeee!</Button>
    <Form/>
  );
}

export default App;
