import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {useState,useEffect} from 'react';
import { render } from 'react-dom';
import axios from 'axios';

function FileShare() {

    const getUsers = () =>{
        axios.get(`${process.env.REACT_APP_API_HOST}/users`, {
        })
        .then(function (response) {
          console.log(response.data[0]["username"]);
          return response.data
        })
        .catch(function (error) {
          console.log(error);
        });;
    }

    // const [startDate, setStartDate] = useState('');

    const [selectData, setSelectData] = useState([]);

    let displayData = [];
    const path = `${process.env.REACT_APP_API_HOST}/users/`


    useEffect(() => {
        axios.get(path).then(res => {
            console.log(res.data.map(e=>({name: e.username, id:e.id})))
            setSelectData(res.data.map(e=>({name: e.username, id:e.id})))
        })
    }, [])



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
                                options={selectData}
                                displayValue="name"
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
