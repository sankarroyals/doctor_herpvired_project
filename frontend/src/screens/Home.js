import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import AppointmentList from './patients/AppointmentList'
import PHome from './patients/PHome'

const Home = () => {
  const [role,setRole] = useState('')
  const [superuser,setSuperuser]=useState(false)
  const [email,setEmail] = useState('')

 




  useEffect(()=>{
      const data= JSON.parse(localStorage.getItem('userDetails'))
      if(data){
          setRole(data.role)
          setSuperuser(data.is_superuser)
          setEmail(data.email)
      }

  },[])


  if(role === 'doctor'){
    return (

      <div>
        <Navigate to={`/yourappointments/${email}`} />
      </div>
    )
  }
  else if(role === 'patient'){
    return (

      <>
        <PHome />
      </>
    )
  }
  else if(superuser){
    return (

      <div>Home for Admin</div>
    )
  }
  else{
    return (

      <><PHome /></>
    )
  }
 
}

export default Home