import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppointmentList = () => {
  const [data, setData] = useState([])

  const [user, setUser] = useState([])

  const [load, setLoad] = useState()

  const { email } = useParams()


  // const now = new Date()
  // now.setMinutes(now.getMinutes()-now.getTimezoneOffset())
  // newDate=now.toISOString().slice(0,16)







  const navigate = useNavigate()


  const MessageSender = (name, id) => {
    navigate(`/message/${name}/${id}/`)
  }



  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      setUser(JSON.parse(localStorage.getItem('userDetails')))
    }



  }, [])


  useEffect(() => {
    try {
      // used to get the doctors appointments when the patient login
      if (user.role === 'patient') {

        axios.get(`/api/ourAppointments/${email}/`).then((res) => {
          setData(res.data)

        })



      }




    } catch (error) {
      console.log(error)
    }
  }, [email, user.role])





  // used to get the doctors appointments when the doctor login
  useEffect(() => {
    try {
      // used to get the doctors appointments when the patient login
      if (user.role === 'doctor') {
        axios.get(`/api/myTotalPatientsAppointment/${email}/`).then((res) => {
          setData(res.data)
        })





      }

      // used to get the doctors appointments when the doctor login


    } catch (error) {
      console.log(error)
    }
  }, [email, user.role])












  // change payment status
  const changePaymentStatus = async (id) => {
    console.log('p')
    await axios.get(`/api/changePaymentStatus/${id}/`).then((res) => {
      console.log(res.data)
    })
    window.location.reload()


  }
  const changeAppointmentStatus = async (id) => {
    console.log('a')
    await axios.get(`/api/changeAppointmentStatus/${id}/`).then((res) => {
      console.log(res.data)
    })
    window.location.reload()
  }


  console.log(data)
  return (
    <div>
      <div><h1>Your Appointments</h1></div>
      <Link to={`/`} className='btn btn-light my-3' style={{fontSize:"20px"}}>⬅</Link>
      {user.role === 'patient' && <span>Note: Pending, Appointment and messages can only changed by Doctor</span>}
      {/* <button className='ml-5 bg-success p-2 text-white'  style={{border:"none"}} onClick={()=>{window.location.reload()}}>
        Click to load data
      </button> */}

      <Table striped bordered hover responsive className='table-sm' style={{ width: "100vw" }}>
        <thead>
          {user.role === 'patient' ?
            <tr>
              
              <th>Doctor</th>
              <th>Email</th>
              <th>Payment_status</th>
              <th>Application_status</th>
              <th>Appointment date request</th>
              <th>Message by doctor</th>
              <th>Your Reply</th>
            </tr>

            :

            <tr>
              
              <th>Patient</th>
              <th>Email</th>
              <th>Payment_status</th>
              <th>Application_status</th>
              <th>Message To The Patient</th>
              <th>Appointment date request</th>
              <th>Patient Reply</th>
            </tr>

          }

        </thead>

        <tbody >
          {data.map(d => (
            <tr key={d.id}>
              

              {user.role === 'patient' ?
                <td className='text-capitalize' style={{ margin: "20px" }}>{d.doctor_name}</td>
                :
                <td className='text-capitalize' style={{ margin: "20px" }}>{d.patient_name}</td>
              }


              {user.role === 'patient' ?
                <td>{d.doctor_email}</td>
                :
                <td>{d.patient_email}</td>
              }



              {/* IF PAYMENT IS ACCEPTED BY DOCTOR */}
              {d.payment_status === 'accepted' ?
                <td>

                  {user.role === 'patient' ?
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-success" disabled>
                      <span className='text-white text-bold'>{d.payment_status}</span>
                    </button>
                    :
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-success"
                      onClick={() => changePaymentStatus(d.id)}
                    >
                      <span className='text-white text-bold'>{d.payment_status}</span>
                    </button>}

                </td>
                :
                <td>
                  {user.role === 'patient' ?
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-danger" disabled>
                      <span className='text-white text-bold'>{d.payment_status}</span>
                    </button>
                    :
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-danger"
                      onClick={() => changePaymentStatus(d.id)}
                    >
                      <span className='text-white text-bold'>{d.payment_status}</span>
                    </button>}
                </td>

              }

              {d.appointment_status === 'accepted' ?
                <td>

                  {user.role === 'patient' ?
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-success" disabled>
                      <span className='text-white text-bold'>{d.appointment_status}</span>
                    </button>
                    :
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-success"
                      onClick={() => changeAppointmentStatus(d.id)}
                    >
                      <span className='text-white text-bold'>{d.appointment_status}</span>
                    </button>}


                </td>
                :
                <td>

                  {user.role === 'patient' ?
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-danger" disabled>
                      <span className='text-white text-bold'>{d.appointment_status}</span>
                    </button>
                    :
                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }} className="bg-danger"
                      onClick={() => changeAppointmentStatus(d.id)}>
                      <span className='text-white text-bold' >{d.appointment_status}</span>
                    </button>}
                </td>
              }

              {user.role === 'doctor' ?

                <td>{d.date_you_want.slice(0, 10)} & {d.date_you_want.slice(11, 17)} <Link to={`/updateCalender/${d.id}`} className="ml-4">Update ?</Link></td>
                :
                <td>{d.date_you_want.slice(0, 10)} & {d.date_you_want.slice(11, 17)}</td>
              }


              <td>


                <td className='d-flex flex-column justifyContent-center alignItems-center'>
                  {user.role === "patient" ?
                    <p>{d.message}</p>
                    :


                    <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }}
                      onClick={() => MessageSender(d.patient_name, d.id)}
                    ><i class="fas fa-paper-plane"></i></button>

                  }

                </td>





              </td>


              {/* Add patient reply or display patient message */}

              <td className='d-flex flex-column justifyContent-center alignItems-center'>
                {user.role === "doctor" ?
                  <p>{d.patientMessage}</p>
                  :


                  <button style={{ border: "none", width: "100%", padding: "10px", textTransform: "capitalize" }}
                    onClick={() => MessageSender(d.doctor_name, d.id)}
                  ><i class="fas fa-paper-plane"></i></button>

                }

              </td>

              {user.role === 'patient' &&
                <td>
                  {/* cancel appontment by patient */}
                  <button onClick={() => {
                    try {
                      axios.get(`/api/cancel/${d.id}`)
                      window.location.reload()
                    } catch (error) { console.log(error) }

                  }}

                    className="p-2 text-white bg-primary text-bold"
                    style={{ border: "none" }}

                  >Cancel Appointment</button>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </Table>





    </div>
  )
}

export default AppointmentList
// PatientAddMessage/<int:id>/