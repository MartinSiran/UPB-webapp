import './App.css';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import CryptoForm from './components/CryptoForm'
import Registration from './components/Registration'
import Logged from './components/Logged';
import FileShare from './components/FileShare'
import {Route, Routes} from "react-router-dom"

axios.defaults.withCredentials = true

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path='/' element={<Registration/>}></Route>
        <Route path='/fileshare' element={<FileShare/>}></Route>
        <Route path='/logged' element={<Logged/>}></Route>
      </Routes>
    </Container>
  );
}

export default App;
