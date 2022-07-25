import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import axios from 'axios'
import urls from '../../Config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const Patient_signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState()
    const [userInfo, setUserinfo] = useState(false)

    const [next,setNext] = useState(true)



    useEffect(() => {
        if (localStorage.getItem('userDetails')) {
            setUserinfo(true)
        }
        console.log(userInfo)

    }, [userInfo])

    const handleImage = (e) => {
        setImage(e.target.files[0])
        console.log(image)
    }

    const location = () =>{
        
    }




    const navigate= useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(image, address, email, password)
        try {

            await axios.post(`${urls.BASE_URL}/patient/signup/`,
                { 'name': name, 'email': email, 'password': password, 'mobile': mobile, 'address': address, 'image': image },
                { headers: { "Content-Type": "multipart/form-data" } }).then((res)=>{
                    localStorage.setItem('userDetails',JSON.stringify(res.data))
                    console.log(JSON.parse(localStorage.getItem('userDetails')))
                })

            // await axios.get('http://127.0.0.1:8000/api/doctors/').then((res)=>{
            //     console.log(res.data)
            // })

            setTimeout(()=>{
                window.location.reload()
                navigate('/')
            },200)


        } catch (error) {
            console.log(error)
        }
    }

    if (userInfo) {
        return <Navigate to='/' />
    }

    else {



        return (
            <FormContainer>
                {name ?
                    <h1 style={{ textTransform: "capitalize", wordSpacing: "0", color: "green" }}>Hloo {name} 🩺</h1>
                    : <h1> Sign Up</h1>}

                <Form onSubmit={submitHandler}>
                    {next?
                   <>
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

                    <Form.Group controlId='email'>
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
                   <div className=''
                   style={{display:"flex",flexDirection:"column",justifyContent:"end",alignItems:"end"}}
                   >
                   <p
                    style={{marginTop:"20px",cursor:"pointer",width:"80px", textAlign:'center',color:"white",padding:"15px"}}
                    className="bg-dark"
                    onClick={()=>{
                        setNext(false)
                    }}
                    >Next</p>
                   </div>
                   </>

                    :

                   <>
                   <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                           
                            type='address'
                            placeholder='Enter Your Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                        

                    <i class='fa-solid fa-location-dot' style={{position:"absolute",right:"20px",top:"90px",cursor:"pointer"}}
                    
                    onClick={location}
                    ></i>
                    </Form.Group>
                    <Form.Group controlId='mobile'>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            
                            type='mobile'
                            placeholder='Enter Your Mobile'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            required
                            type='file'
                            onChange={handleImage}
                        >
                        </Form.Control>
                    </Form.Group> 
                    <div className=''
                   style={{display:"flex",justifyContent:"start",alignItems:"start"}}
                   >
                   <p
                    style={{marginTop:"20px",cursor:"pointer",width:"80px", textAlign:'center',color:"white",padding:"15px"}}
                    className="bg-dark"
                    onClick={()=>{
                        setNext(true)
                    }}
                    >Back</p>
                    

                    <Button type='submit' variant='primary' style={{JustifySelf:"end",marginLeft:"350px",marginTop:"20px"}}>
                        Register
                    </Button>
                    </div>
                    </>
                    }

                </Form>

                <Row className='py-3'>
                    <Col>
                        Have An Patient Account?  <Link to='/login' >Login</Link>
                    </Col>
                    <Col>
                        Are you a Doctor ?  <Link to='/doctor_signup' >Doctor_signup</Link>
                    </Col>
                </Row>
            </FormContainer>
        )
    }
}

export default Patient_signup