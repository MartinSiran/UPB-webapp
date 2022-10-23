import React from 'react'
import Button from 'react-bootstrap/Button';
import {useState} from 'react';

export default function Form() {


    const [startDate, setStartDate] = useState('');

    const [service, setService] = useState('');

    const handleChangeDate = event => {
        setStartDate(event.target.value);

        console.log('value is:', event.target.value);
    };

    const handleChangeService = event => {
        setService(event.target.value);

        console.log('value is:', event.target.value);
    };

    function createReservation() {
        console.log(startDate, '  ', service);

        <p>{startDate} aaaa  {service}</p>
    }

  return (
    <>
        <h1 class="text-center">
        Create reservation 
        </h1>
        <div class="d-flex justify-content-center mt-5">
            <div class="d-flex justify-content-start">
            <div class="flex">
                {/* <label for="startDate">Date */}
                <input id="startDate" class="form-control" type="date" onChange={handleChangeDate} value={startDate}/>
                {/* </label> */}
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
                <Button onClick={() => createReservation()} class="primary">Confirm</Button>
            </div>
            </div>
    </div>
    </>
  )
}
