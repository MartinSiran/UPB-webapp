import React, { useRef, useState, useEffect } from 'react'
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
import PasswordChecklist from "react-password-checklist"
import Alert from 'react-bootstrap/Alert';
import {Link, Redirect, useNavigate} from 'react-router-dom';
import SessionTimeout from '../SessionTimeout';


const Registration = () => {

  const [justifyActive, setJustifyActive] = useState('tab1')
  const [registrationFirstName, setRegistrationFirstName] = useState('');
  const [registrationLastName, setRegistrationLastName] = useState('');
  const [registrationUsername, setRegistrationUsername] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationPasswordAgain, setRegistrationPasswordAgain] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAuthenticated, setAuth] = useState(false);
  let button;
  const [disablePassword, setDisablePassword] = useState(true)
  const [isPasswordCommon, setIsPasswordCommon] = useState(false)

  const [loginStatus, setLoginStatus] = useState(true);
  const handleClick = () => {
    loginUser()
    setAuth(!isAuthenticated);
  }

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return
    }

    setJustifyActive(value)
  }

  const registerUser = () => {
    axios.post(`${process.env.REACT_APP_API_HOST}/register`, 
    {
      firstname: registrationFirstName,
      lastname: registrationLastName,
      username: registrationUsername,
      password: registrationPassword
    }
    ).then((res) => {
      setIsPasswordCommon(res.data.hash)
      console.log('Is password from commonPasswordList? : ' + res.data.isPasswordCommon)
    })
  }

  const loginUser = () => {
    if(loginUsername !== "" && loginPassword!== ""){
      axios.post(`${process.env.REACT_APP_API_HOST}/login`, 
      {
        username: loginUsername,
        password: loginPassword
      }
      ).then((res) => {
        console.log('Is user authenticated? : ' + res.data)
        axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
          if(res.data.loggedIn == true){
            setLoginStatus(true)
            navigate("/logged")
          }else{
            setLoginStatus(false)
          }
        })
      })
    }
  }

  let navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
      if(res.data.loggedIn == true){
        setLoginStatus(true)
        navigate("/logged")
      }else{
        setLoginStatus(false)
      }
    })
  }, [])

  return (
    <div>
    {loginStatus==false && <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

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

          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='email'
          onChange={(e) => setLoginUsername(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
          onChange={(e) => setLoginPassword(e.target.value)}/>
          <MDBBtn className="mb-4 w-100"  onClick={handleClick}>Sign in</MDBBtn>
        
          <SessionTimeout isAuthenticated={isAuthenticated} logOut={handleClick} />
       

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <div className="text-center ">
            <h4 className='mb-3'>Registration form:</h4>
          </div>
          <MDBInput wrapperClass='mb-4' label='First name' type='text'
          onChange={(e) => setRegistrationFirstName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Last name'  type='text' 
          onChange={(e) => setRegistrationLastName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Username' type='text'
          onChange={(e) => setRegistrationUsername(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' type='password'
          onChange={(e) => setRegistrationPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password again' type='password'
          onChange={(e) => setRegistrationPasswordAgain(e.target.value)}/>
          <PasswordChecklist
            rules={["minLength","specialChar","number","capital","match","lowercase"]}
            minLength={8}
            value={registrationPassword}
            valueAgain={registrationPasswordAgain}
            onChange={(isValid) => {
              if (isValid) {
                setDisablePassword(false)
              } else {
                setDisablePassword(true)
              }
            }}
          />
          { 
            isPasswordCommon &&           
            <Alert key="danger" variant="danger">
              This is danger alert—check it out!
            </Alert>
          }
          { 
            isPasswordCommon == null &&           
            <Alert key="danger" variant="danger">
              Username already used!
            </Alert>
          }
     
          <MDBBtn disabled={disablePassword} className="mb-4 w-100" onClick={registerUser}>Sign up</MDBBtn>
        </MDBTabsPane>

      </MDBTabsContent>
    </MDBContainer>}
    </div>
  )
}

export default Registration