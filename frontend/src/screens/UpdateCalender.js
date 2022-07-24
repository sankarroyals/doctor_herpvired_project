import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Form, Button, Row, Col } from 'react-bootstrap'
import urls from '../Config'


const UpdateCalender = () => {
    const {id,email} = useParams()
    const [data,setdata] = useState([])
    const [date,setDate] = useState('')
    const [error,setError] = useState('')
    const [user,setUser] = useState([])


    useEffect(()=>{
        if (localStorage.getItem('userDetails')){
          setUser(JSON.parse(localStorage.getItem('userDetails')))
        }
      },[])

    const navigate = useNavigate()
    const dataSent = async(e)=>{
        e.preventDefault();
        
        try{
            await axios.post(`${urls.BASE_URL}/updateCalender/${id}/`,
            {'date':date},{header:{"Content-Type":"application/json"}}
            ).then((res)=>{console.log(res.data)})
            if(user.role==='doctor'){
                navigate('/')
            }
            else{
                navigate(`/yourappointments/${user.email}`)
            }


        }catch(error){
            console.log(error)
        }
        
      }


  return (
    <div>
      <FormContainer>
         <h3 className='text-capitalize'>Update Date</h3>
            {error ? <Message variant='danger'>{error}</Message>:""}
            
         
               
                <Form onSubmit={dataSent} className="mt-4">
    
                    <Form.Group controlId='email'>
                        <Form.Label className="mb-2">Update Date</Form.Label>
                        <Form.Control
                        required
                        className="mb-2"
                            type='datetime-local'
                            placeholder='Enter Date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
    
    
                    
    
                    <Button type='submit' variant='primary' className="mt-2">
                        Change
                    </Button>
                </Form>
    
               
    
         </FormContainer>
    </div>
  )
}

export default UpdateCalender