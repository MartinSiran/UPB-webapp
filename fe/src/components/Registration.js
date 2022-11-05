import React, { useRef, useState } from 'react'
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit'
import axios from 'axios'


const Registration = () => {

  const [justifyActive, setJustifyActive] = useState('tab1')
  const [registrationFirstName, setRegistrationFirstName] = useState('');
  const [registrationLastName, setRegistrationLastName] = useState('');
  const [registrationUsername, setRegistrationUsername] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return
    }

    setJustifyActive(value)
  }

  const registerAccount = () => {
    console.log('Register: ' + registrationFirstName, registrationLastName, registrationUsername, registrationPassword)
    
    axios.post(`${process.env.REACT_APP_API_HOST}/register`, registrationPassword).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'export.enc');
      document.body.appendChild(link);
      link.click();
    })
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center">
            <h4 className='mb-3'>Login form:</h4>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'
          onChange={(e) => setLoginUsername(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Username' id='form2' type='password'
          onChange={(e) => setLoginPassword(e.target.value)}/>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <div className="text-center ">
            <h4 className='mb-3'>Registration form:</h4>
          </div>
          <MDBInput wrapperClass='mb-4' label='First name' type='text'
          onChange={(e) => setRegistrationFirstName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text' 
          onChange={(e) => setRegistrationLastName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'
          onChange={(e) => setRegistrationUsername(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'
          onChange={(e) => setRegistrationPassword(e.target.value)}/>
          <MDBBtn className="mb-4 w-100" onClick={registerAccount}>Sign up</MDBBtn>
        </MDBTabsPane>

      </MDBTabsContent>
    </MDBContainer>
  )
}

export default Registration