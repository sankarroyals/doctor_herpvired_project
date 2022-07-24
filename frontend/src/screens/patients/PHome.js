import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import { Row, Col } from 'react-bootstrap'
import All_doctor from '../doctors/All_doctor'


const PHome = () => {
    const [data,setData] = useState([])
    const [error,setError] = useState('')
    const path = '../../../../doctorPatient/media/images/'
    useEffect( ()=>{
         try{
          axios.get('/api/doctors/').then((res)=>{
            setData(res.data)
        })
         }
         catch(error){
          setError('Error')
         }
        
    },[])
    console.log(data)

   
       
    



  return (
   
    <div>
            

            <h1>List of all doctors</h1>
            {
                error ? <Message variant='danger'>{error}</Message>
                  :
                    <div>
                        <Row>
                            {data.map(d => (
                                <Col key={d._id} sm={12} md={6} lg={4} xl={3}>
                                    <All_doctor d={d}/>
                                </Col>
                            ))}
                        </Row>
                        
                    </div>
            }
        </div>
  )
}

export default PHome