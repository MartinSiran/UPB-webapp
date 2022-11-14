import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {useState} from 'react';
import { render } from 'react-dom';
import axios from 'axios';

function FileShare() {


    // const [startDate, setStartDate] = useState('');

    // const [service, setService] = useState('');

    let displayData = [];

    let selectData =  ["a"];


    let getUsers = () =>{
        axios.get(`${process.env.REACT_APP_API_HOST}/users`, {
        })
        .then(function (response) {
          console.log(response.data[0]["username"]);
          selectData = response.data[0]["username"];
        })
        .catch(function (error) {
          console.log(error);
        });;
    }

    // window.onload = () => {
    //     console.log("now");
    //     getUsers();
    // }

    // selectData =  getUsers();

    return (
        <>
            <h1 class="text-center">
            Share file 
            </h1>
            <div class="d-flex justify-content-center mt-5">
                <div class="d-block">
                    <div class="d-flex justify-content-start">
                        <div class="flex">
                        <Form.Group className="mb-3">
                            <Form.Label>Upload file to share:</Form.Label>
                            <Form.Control type="file" required/>
                        </Form.Group>
                        </div>
                        <div class="d-flex justify-content-end mx-1">
                        <Form.Group className="mb-3">
                            <Form.Label>Select users to share with:</Form.Label>
                            <DropdownMultiselect
                                onClick={getUsers} 
                                options={selectData}
                                name="countries"
                            />
                        </Form.Group>
                        </div>
                        <div class="d-flex justify-content-center mx-3">
                            <Button class="primary">Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default FileShare;
