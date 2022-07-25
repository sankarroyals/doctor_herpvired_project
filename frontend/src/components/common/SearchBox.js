import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import urls from '../../Config'
import { Row, Col } from 'react-bootstrap'
import All_doctor from '../../screens/doctors/All_doctor'

function SearchBox() {
    const [data, setData] = useState([])
    const [keyword,setKeyword] = useState('')
 

    // let history = useHistory()

    const submitHandler = async(e) => {
        e.preventDefault()
        setKeyword(e.target.value)
        await axios.get(`${urls.BASE_URL}/search/${e.target.value}/`).then((res)=>{
            setData(res.data)
        })
       
       
    }
    return (
         <>
            <div>

            
            <Form onSubmit={submitHandler} style={{display:"flex"}}>
            <Form.Control
                type='text'
                name='q'
                placeholder='Search the doctor here .........'
                value={keyword}
                onChange={submitHandler}
                className='mr-sm-2 ml-sm-5' style={{background:"white",borderRadius:"20px",border:"2px solid gray"}}
            ></Form.Control>
            </Form>
          
         </div>
            <div>
                        <Row>
                            {data.map(d => (
                                <Col key={d._id} sm={12} md={6} lg={4} xl={3}>
                                    <All_doctor d={d}/>
                                </Col>
                            ))}
                        </Row>
                        
                    </div>
         </>

            
        
    )
}

export default SearchBox
