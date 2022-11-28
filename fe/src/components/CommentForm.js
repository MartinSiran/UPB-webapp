import axios from 'axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import {Link, Redirect, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logged from './Logged';


const CommentForm = (props) => {
  
  const [message, setMessage] = useState('');
  const [loggedUser, setLoggedUser] = useState('');



  const handleComment = () => {
    commentUser();

  }
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_HOST}/login`).then(res => {
      if(res.data.loggedIn == false){
        navigate("/")
      }
      setLoggedUser(res.data.user);

      
        showComments();
      
      
    })
   
  }, [])




  const showComments = () => {
    axios.get(`${process.env.REACT_APP_API_HOST}/comment`).then(res => {
     
      let list = document.getElementById("messages");
      console.log(document.getElementById("messages"));
      
      while(list.hasChildNodes()) {
        list.removeChild(list.children[0]);
      }

      res.data.slice().reverse().forEach((item) => {
    
        let li = document.createElement("li");
        let liUser = document.createElement("li");
        liUser.innerText = item['user'] + " - "+ item['comment_time'];
      
        li.innerText = item['comment'];
        list.append(liUser,li);
      });
      
      
     
        })
  }

  const commentUser = () => {
      if(message !==""){
      axios.post(`${process.env.REACT_APP_API_HOST}/comment`, 
      {
        comment: message,
        username: loggedUser
      })
    }
      
        
      
 
  }
  let navigate = useNavigate();
  
  return (
    
<Container className='mt-2'>
<Form >
<Form.Group className="mb-3" controlId="comment">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows={3} type="textarea" onChange={(e) => setMessage(e.target.value)} />
      </Form.Group>
  <Button variant="primary" type="submit" onClick={handleComment}>
    Send
  </Button>
</Form>
<ul  id="messages"></ul>
</Container>
  );
}

export default CommentForm;
