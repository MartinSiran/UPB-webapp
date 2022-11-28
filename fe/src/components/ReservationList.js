
import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';

const ReservationList = () => {

  const [all, setAll] = useState([])
  const [filter, setFilter] = useState("")

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  const searchAll = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/events/search/${filter}`).then(res => {
      setAll(res.data.map(el => ({id: el.id, title: el.title, date: el.event_time, user: el.provider})))
    })
  }

    useEffect(() => {
      let ignore = false
      const getRes = async () => {
        const result = await axios.get(`${process.env.REACT_APP_API_HOST}/events`)
        console.log(result)
        if (!ignore) {
          setAll(result.data.map(el => ({id: el.id, title: el.title, date: el.event_time, user: el.provider})))
        }
      }
      getRes()
      return () => { ignore = true }
    }, [])

    return (
        <Container>
            <h1>Reservation List</h1>
            <Form.Control type="text" placeholder="Search..." onChange={changeFilter}/>
            <Button variant="primary" onClick={searchAll}>Search</Button>
          {all.map(el => (
            <div key={el.id}>
              <h2>title: {el.title}</h2>
              <h2>user: {el.user}</h2>
              <h2>date: {el.date}</h2>
              <hr/>
            </div>
          ))}
        </Container>
      );

};

export default ReservationList;
