import axios from 'axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CryptoForm = (props) => {

  const handleCrypto = (event) => {
    event.preventDefault()
    const formData = new FormData()
    const file = event.target.fileToCrypt.files[0]
    formData.append("file", file)

    if (["public", "private"].some(element => props.keyType.includes(element))) {
      const keyFile = event.target.cipherKey.files[0]
      formData.append("key", keyFile)
    }

    axios.post(`${process.env.REACT_APP_API_HOST}/${props.action}`, formData).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'export.enc');
      document.body.appendChild(link);
      link.click();
    })
  }

  return (
    <Container className='mt-2'>
      <Form onSubmit={handleCrypto}>
        <Form.Group controlId="fileToCrypt" className="mb-3">
          <Form.Label>Upload file to {props.action}</Form.Label>
          <Form.Control type="file" required/>
        </Form.Group>
        { (["public", "private"].some(element => props.keyType.includes(element))) &&
        <Form.Group controlId="cipherKey" className="mb-3">
          <Form.Label>Upload {props.keyType} key (if not specified, default key from server will be used)</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default CryptoForm;
