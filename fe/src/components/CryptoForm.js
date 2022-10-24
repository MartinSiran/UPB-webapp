import axios from 'axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CryptoForm = (props) => {

  const handleCrypto = (event) => {
    event.preventDefault()
    const file = event.target.fileToEncrypt.files[0]
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(`${process.env.REACT_APP_API_HOST}/${props.action}`, formData).then((res) => {
      console.log.apply(res)
    })
  }

  return (
    <Container className='mt-2'>
      <Form onSubmit={handleCrypto}>
        <Form.Group controlId="fileToEncrypt" className="mb-3">
          <Form.Label>Upload file to {props.action}</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CryptoForm;
