import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
import urls from '../Config'


const Appointemt = () => {
  const [disease, setDisease] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [userInfo, setUserinfo] = useState([])
  const { id } = useParams()


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userDetails'))
    setUserinfo(data)



  }, [])

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({"patient_name": userInfo.first_name, "email": userInfo.email, "mobile": userInfo.mobile,"date":date, "disease":disease})
    try {
      await axios.post(`${urls.BASE_URL}/doctor/${id}/appointment/`,
      {"patient_name": userInfo.first_name, "email": userInfo.email, "mobile": userInfo.mobile,"date":date, "disease":disease},
      {headers:{"Content-Type":"application/json"}}
      ).then((res)=>{
        console.log(res.data)
      })

      navigate(`/yourappointments/${userInfo.email}/`)
    } 
    catch (error) {
      console.log(error)
    }
    // console.log(disease, date)
    
  }





  
  return (

    <div>
      <Link to={`/doctor/${id}`} className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Appointment Slot Booking</h1>
        {error ? <Message variant='danger'>{error}</Message> : ""}



        <Form className="mt-4" onSubmit={submitHandler}>

          <Form.Group controlId='disease'>
            <Form.Label className="mb-2">Disease Details</Form.Label>
            <Form.Control
              required
              className="mb-2"
              type='text'
              placeholder='Enter Your problem'
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            >
            </Form.Control>
          </Form.Group>


          <Form.Group controlId='date'>
            <Form.Label>Date You Want</Form.Label>
            <Form.Control
              required
              type='datetime-local'
              placeholder='Enter Date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className="mt-2">
            Book this Appointment
          </Button>
        </Form>



      </FormContainer>
    </div>
  )
}

export default Appointemt