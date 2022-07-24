import React, { useEffect, useState } from 'react'
import FormContainer from '../FormContainer'
import { Link,Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Message from '../Message'
import Loader from '../Loader'
import urls from '../../Config'

const Login = ({location,history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userInfo,setUserinfo] = useState(false)
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    
    // const redirect = location.search ? location.search.split('=')[1] : '/'
        
        
    
   



    useEffect(()=>{
        
        if(localStorage.getItem('userDetails')){
        setUserinfo(true)}
        console.log(userInfo)

    },[userInfo])

    const navigate= useNavigate()

    const submitHandler= async(e)=>{
        e.preventDefault();
        
        console.log(email,password)
        try{
            await axios.post(`${urls.BASE_URL}/login/`,
        {'email':email,'password':password},
        {headers:{"Content-Type":"application/json"}}).then((res)=>{
            localStorage.setItem('userDetails',JSON.stringify(res.data))
            console.log(JSON.parse(localStorage.getItem('userDetails')))
        })
        setTimeout(()=>{
            window.location.reload()
            navigate('/')
        },200)
        

    }
    catch(error){
        // console.log(error)
        
        setError('Login Credentials is not correct😐😐')
        

        
        
    }

    }

  if(userInfo){
    return <Navigate to='/' />
  } 
    
 else{
    return (
        <div>
         <FormContainer>
         <h1>Sign In</h1>
            {error ? <Message variant='danger'>{error}</Message>:""}
            
         
               
                <Form onSubmit={submitHandler} className="mt-4">
    
                    <Form.Group controlId='email'>
                        <Form.Label className="mb-2">Email Address</Form.Label>
                        <Form.Control
                        required
                        className="mb-2"
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
    
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
                    <Button type='submit' variant='primary' className="mt-2">
                        Sign In
                    </Button>
                </Form>
    
                <Row className='py-3'>
                    <Col>
                        New Patient? <Link to='/patient_signup'>Patient Register</Link>
                    </Col>
                    <Col>
                        New Doctor? <Link to='/doctor_signup'>Doctor Register</Link>
                    </Col>
                </Row>
    
         </FormContainer>
        </div>
      )}
 }
  


export default Login