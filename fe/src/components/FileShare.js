import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AsyncSelect from 'react-select/async';
import { useState, useEffect } from 'react';
import axios from 'axios';

function FileShare() {

    const handleChange = value => {
        console.log(value)
    }

    const filterUsers = (inputValue) => {
        return selectData.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = (inputValue) =>
        new Promise ((resolve) => {
            setTimeout(() => {
                resolve(filterUsers(inputValue));
            }, 1000);
        });

    const getUsers = () => {
        return axios.get(`${process.env.REACT_APP_API_HOST}/users`).then(res => {
            return res.data.map(user => ({ key: user.id, label: user.username }))
        })
    }

    const [selectData, setSelectData] = useState([]);

    useEffect(() => {
        let ignore = false
        const getUsers = async () => {
            const result = await axios.get(`${process.env.REACT_APP_API_HOST}/users`)
            console.log(result)
            if (!ignore) {
                setSelectData(result.data.map(user => ({ key: user.id, label: user.username })))
            }
        }
        getUsers()
        return () => { ignore = true }
    }, [])


    return (
        <>
            <h1 className="text-center">
                Share file
            </h1>
            <p>{JSON.stringify(selectData)}</p>
            <div className="d-flex justify-content-center mt-5">
                <div className="d-block">
                    <div className="d-flex justify-content-start">
                        <div className="flex">
                            <Form.Group className="mb-3">
                                <Form.Label>Upload file to share:</Form.Label>
                                <Form.Control type="file" required />
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-end mx-1">
                            <Form.Group className="mb-3">
                                <Form.Label>Select users to share with:</Form.Label>
                                <AsyncSelect
                                    isMulti
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={getUsers}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-center mx-3">
                            <Button className="primary">Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileShare;
