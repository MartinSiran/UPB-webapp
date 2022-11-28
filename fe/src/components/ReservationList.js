
import React from "react";
import axios from 'axios';
import Reservation from './Reservation'
import Button from 'react-bootstrap/Button';
  
const ReservationList = () => {

    const results = [];

    function getReservations(){
        axios.get(`${process.env.REACT_APP_API_HOST}/events`)
          .then(function (response) {
            // console.log(response.data);
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
    
    }

    const response = getReservations()

    function mapResponse(response){
        console.log(response)
        response.forEach((response, index) => {
            results.push(
              <div key={index}>
                <h2>title: {response.title}</h2>
                <h2>provider: {response.provider}</h2>
                <h2>date: {response.published}</h2>
                <hr/>
              </div>,
            );
          });
    }

    mapResponse(response)

    // return (
    //     <div>
    //     <h1>Reservation List</h1>
    //     <Button onClick={getReservations} class="primary">Confirm</Button>
    //     </div>


    // )
    return (
        
        <div>
            <h1>Reservation List</h1>
            <Button onClick={getReservations} class="primary">Confirm</Button>
          {/* {response.map((response, index) => {
            return (
              <div key={index}>
                <h2>title: {response.title}</h2>
                <h2>provider: {response.provider}</h2>
                <h2>date: {response.published}</h2>
                <hr />
              </div>
            );
          })}
    
          <hr />
          <hr />
          <hr /> */}
    
          {results}
        </div>
      );
    
};
  
export default ReservationList;