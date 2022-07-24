import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'

const Single_doctor = () => {
    const [data,setData] = useState([])
    const [error,setError] = useState('')
    const {id} = useParams()
    const navigate = useNavigate()

    const buttonHandle = () =>{
        navigate(`/doctor/${data.id}/appointment/`)
    }




     useEffect(()=>{

        try{
            axios.get(`/api/doctor/${id}`).then((res)=>{
                setData(res.data)
            })
        }
        catch(error){
            // console.log(error)
            
            setError('Error in fetching Doctor please try again😐')
            
    
            
            
        }
    },[id])
    console.log(data)


  return (
    <>
    <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {
                 error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={data.image} alt={data.first_name} fluid  width="300" height="300"/>
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{data.first_name}</h3>
                                        </ListGroup.Item>

                                       

                                        <ListGroup.Item>
                                            Speciality: <span className='text-capitalize text-bold'>{data.speciality}</span>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Hospital: {data.hospital}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Address:</Col>
                                                    <Col>
                                                        <strong>🏠{data.address}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Email:</Col>
                                                    <Col>
                                                       <a href={`mailto:${data.email}`}>{data.email}</a>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            

                                            <ListGroup.Item>
                                                <Button
                                                    
                                                    className='btn-block'
                                                   onClick={buttonHandle}
                                                   
                                                    type='button'>
                                                    Book an appointment
                                                </Button>
                                            </ListGroup.Item> 
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                           
                             
                        </div>
                    )

            }


        </div>

    </>
  )
}

export default Single_doctor