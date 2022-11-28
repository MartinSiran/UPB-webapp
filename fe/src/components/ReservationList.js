
import React from "react";
import axios from 'axios';
import Reservation from './Reservation'
import Button from 'react-bootstrap/Button';
import {useState, useEffect} from 'react';
  
const ReservationList = () => {

  const [all, setAll] = useState([])

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
        <div>
            <h1>Reservation List</h1>
          {all.map(el => (
            <div key={el.id}>
              <h2>title: {el.title}</h2>
              <h2>user: {el.user}</h2>
              <h2>date: {el.date}</h2>
              <hr/>
            </div>
          ))}
        </div>
      );

};

export default ReservationList;
