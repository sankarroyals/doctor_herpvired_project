import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import axios from 'axios'
import urls from '../../Config'


const Doctor_signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [hospital, setHospital] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState()

    const [userInfo, setUserinfo] = useState(false)



    useEffect(() => {
        if (localStorage.getItem('userDetails')) {
            setUserinfo(true)
        }
        console.log(userInfo)

    }, [userInfo])


    
    const handleImage=(e)=>{
        setImage(e.target.files[0])
        console.log(image)
    }

    // use for navigate pages
    const navigate= useNavigate()
    const submitHandler = async (e)=>{
        e.preventDefault();
        console.log(image,address,email,password,hospital,speciality)
        try{
        
            await axios.post(`${urls.BASE_URL}/doctor/signup/`,
            {'name':name,'email':email,'password':password,'mobile':mobile,'address':address,'image':image,'hospital':hospital,'speciality':speciality},
            {headers:{"Content-Type":"multipart/form-data"}}).then((res)=>{
                localStorage.setItem('userDetails',JSON.stringify(res.data))
                console.log(JSON.parse(localStorage.getItem('userDetails')))
            })
    
            setTimeout(()=>{
                window.location.reload()
                navigate('/')
            },200)
         
            
            }catch(error){
                console.log(error)
            }
    }

 
    
    if (userInfo) {
        return <Navigate to='/' />
    }

    else {

  return (
    <FormContainer>
    {name?
    <h1 style={{textTransform:"capitalize",wordSpacing:"0",color:"green"  }}>Hloo Doctor {name} 🩺</h1>
    :<h1> Sign Up</h1>}
    
   
    <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                required
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email'  id="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                required
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

        <Form.Group controlId='hospital'>
            <Form.Label>Hospital</Form.Label>
            <Form.Control
                required
                type='hospital'
                placeholder='Enter Your Hospital'
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='mobile'>
            <Form.Label>Mobile</Form.Label>
            <Form.Control
                required
                type='mobile'
                placeholder='Enter Your Mobile'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='speciality'>
            <Form.Label>Speciality</Form.Label>
            <Form.Control
                required
                type='speciality'
                placeholder='Enter Your Speciality'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
                required
                type='address'
                placeholder='Enter Your address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        {/* <input type="file" name="file" id="image" onChange={handleImage} required/> */}
        <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
                required
                type='file'
                onChange={handleImage}
            >
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Register
        </Button>

    </Form>

    <Row className='py-3'>
        <Col>
            Have An Doctor Account?  <Link to='/login' >Login</Link>
        </Col>
        <Col>
            Are you a Patient ?  <Link to='/patient_signup' >Patient_signup</Link>
        </Col>
    </Row>
</FormContainer>
  )
    }
}

export default Doctor_signup