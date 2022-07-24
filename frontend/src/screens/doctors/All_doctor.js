import React from 'react'

import { Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const All_doctor = ({ d }) => {

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/doctor/${d.id}/`}>
                <Card.Img src={d.image} width="300" height="300" className="object-cover " />
            </Link>

            <Card.Body>

                <Card.Title as="h3">
                    <strong>{d.first_name}</strong>
                </Card.Title>






                Speciality: <span className='text-capitalize'>{d.speciality} </span>
                Address: <span className='text-capitalize'>{d.address} </span>
                Hospital: <span className='text-capitalize'>{d.hospital} </span>
                <Link to={`/doctor/${d.id}`}>
                    <span className='text-capitalize' style={{ display: "block", color: "blue" }}>View Details </span>
                </Link>


            </Card.Body>
        </Card>
    )
}
export default All_doctor
