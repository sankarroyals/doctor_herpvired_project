import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Form, Button, Row, Col } from 'react-bootstrap'
import urls from '../Config'

const SendMessage = () => {
    const {id,email} = useParams()
    const [data,setdata] = useState([])
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    const [user,setUser] = useState([])

    useEffect(()=>{
      if (localStorage.getItem('userDetails')){
        setUser(JSON.parse(localStorage.getItem('userDetails')))
      }
    },[])

    const navigate = useNavigate()
    const dataSent = ()=>{
      if(user.role === 'doctor'){
        try{
          axios.post(`${urls.BASE_URL}/AddMessage/${id}/`,
          {"message":message},
          {headers:{"Content-Type":"application/json"}}
          )
          .then((res)=>{console.log(res.data)})
          navigate('/')
         }
         catch(error){
              setError('Error')
         }
      }
      else{
        try{
          axios.post(`${urls.BASE_URL}/PatientAddMessage/${id}/`,
          {"message":message},
          {headers:{"Content-Type":"application/json"}}
          )
          .then((res)=>{console.log(res.data)})
          navigate(`/yourappointments/${user.email}`)
         }
         catch(error){
              setError('Error')
         }
      }
    }
  return (
    <div>
      <FormContainer>
         <h3 className='text-capitalize'>Sending Message to {email}</h3>
            {error ? <Message variant='danger'>{error}</Message>:""}
            
         
               
                <Form onSubmit={dataSent} className="mt-4">
    
                    <Form.Group controlId='email'>
                        <Form.Label className="mb-2">Send Message</Form.Label>
                        <Form.Control
                        required
                        className="mb-2"
                            type='text'
                            placeholder='Enter Message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
    
                    
    
                    <Button type='submit' variant='primary' className="mt-2">
                        Send
                    </Button>
                </Form>
    
               
    
         </FormContainer>
    </div>
  )
}

export default SendMessage