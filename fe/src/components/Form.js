import React from 'react'
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
import { render } from 'react-dom';
import axios from 'axios';

function Form() {

    let displayData = [];

    const [val, setVal] = useState({
        postVal : "",
    });

    const [data, setData] = useState({
        showdata : displayData,
    });

    const [date, setDate] = useState({
        startDate : "",
    });

    const [serv, setServ] = useState({
        service : ""
    });

    const handleChangeDate = event => {
        setDate({
            startDate : event.target.value
        });

        console.log('value is:',  event.target.value);
    };

    const handleChangeService = event => {
        setServ({
            service : event.target.value
        });

        console.log('value is:',  event.target.value);
    };

    function createReservation() {

        displayData.push(<div  id="display-data mt-3"><p>{date.startDate}  {serv.service}</p></div>); 
        console.log(displayData)

        setData({
           showdata : [data.showdata,displayData]
        });

        setVal({
            postVal : ""
        });

        sendToDatabase();
    }

    function sendToDatabase(){
        axios.post(`${process.env.REACT_APP_API_HOST}/events`, {
            event_time: date.startDate,
            title: serv.service,
            provider: "a"
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
            <h1 class="text-center">
            Create reservation 
            </h1>
            <div class="d-flex justify-content-center mt-5">
                <div class="d-block">
                    <div class="d-flex justify-content-start">
                        <div class="flex">
                            <input id="startDate" class="form-control" type="date" onChange={handleChangeDate} value={date.startDate}/>
                        </div>
                        <div class="d-flex justify-content-end mx-1">
                            <select class="form-select" aria-label="Default select example" onChange={handleChangeService}>
                                <option selected>Choose service</option>
                                <option value="Men's cut">Men's cut</option>
                                <option value="Trim the beard">Trim the beard</option>
                                <option value="Hair coloring">Hair coloring</option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-center mx-3">
                            <Button onClick={createReservation} class="primary">Confirm</Button>
                        </div>
                    </div>
                    <div id="display-data-Container">
                        {data.showdata}
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Form;
