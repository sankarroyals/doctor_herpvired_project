import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Form, Button, Row, Col } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import urls from '../Config'
import { Link } from 'react-router-dom'

const MyProfile = () => {
  let [user,setUser] = useState([])
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
 
  const [speciality, setSpeciality] = useState('')
  const [hospital, setHospital] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState()

  const handleImage=(e)=>{
    setImage(e.target.files[0])
    console.log(image)
}


  useEffect(()=>{
    if(localStorage.getItem('userDetails')){
        setUser(JSON.parse(localStorage.getItem('userDetails')))
        
    }
  },[])
  

  const doctorEdit =async (e) =>{
    console.log('doctor')
      try{
      
          await axios.post(`${urls.BASE_URL}/doctorEditProfile/${user.email}/`,
          {'name':name,'email':email,'mobile':mobile,'address':address,'image':image,'hospital':hospital,'speciality':speciality},
          {headers:{"Content-Type":"multipart/form-data"}}).then((res)=>{
              localStorage.setItem('userDetails',JSON.stringify(res.data))
              console.log(JSON.parse(localStorage.getItem('userDetails')))
          })
  
          
              
              
            localStorage.removeItem('userDetails')
            navigate('/')
            window.location.reload()
          
       
          
          }catch(error){
              console.log(error)
          }
  }


  const patientEdit = async (e) =>{
    console.log('patient')
      try{
      
          await axios.post(`${urls.BASE_URL}/patientEditProfile/${user.email}/`,
          {'name':name,'mobile':mobile,'address':address,'image':image},
          {headers:{"Content-Type":"multipart/form-data"}}).then((res)=>{
              localStorage.setItem('userDetails',JSON.stringify(res.data))
              console.log(JSON.parse(localStorage.getItem('userDetails')))
          })
  
          
          localStorage.removeItem('userDetails')
          navigate('/')
          window.location.reload()
          
       
          
          }catch(error){
              console.log(error)
          }
  }


  const navigate= useNavigate()

  const submitHandler = async (e)=>{
      e.preventDefault();
      if(user.role === 'doctor'){
        doctorEdit(e)
      }
      else{
        patientEdit(e)
      }
  }








  return (
    <FormContainer>
    <Link to={`/`} className='btn btn-light my-3' style={{fontSize:"20px",display:"inline" , left:"-120px",top:"-20px",position:"absolute"}}>⬅</Link>
    {user.role === 'doctor'?
    <h1 style={{textTransform:"capitalize",wordSpacing:"0",color:"green"  }}>Hloo Doctor {name} 🩺</h1>
    :<h1> Edit Profile </h1>}
    
   
    <Form onSubmit={submitHandler}>
        
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                required
                type='name'
                placeholder={user.first_name}
                value={name}
                
                onChange={(e) => setName(e.target.value)}
                
            >
            </Form.Control>
        </Form.Group>

       

       {user.role === 'doctor' && 
       <>
        <Form.Group controlId='hospital'>
            <Form.Label>Hospital</Form.Label>
            <Form.Control
                required
                type='hospital'
                placeholder={user.hospital}
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        <Form.Group controlId='speciality'>
            <Form.Label>Speciality</Form.Label>
            <Form.Control
                required
                type='speciality'
                placeholder={user.speciality}
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
            >
            </Form.Control>
        </Form.Group>
        </>
        }

       
        <Form.Group controlId='mobile'>
            <Form.Label>Mobile</Form.Label>
            <Form.Control
                required
                type='mobile'
                placeholder={user.mobile}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

        
        <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
                required
                type='address'
                placeholder={user.address}
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
            Edit Details 
        </Button>
       
        
        

    </Form>

    
</FormContainer>
  )
}

export default MyProfile