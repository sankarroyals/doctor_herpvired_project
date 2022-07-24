import axios from 'axios';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';  

import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap'
import Login from './components/common/Login'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import PSignup from './screens/patients/Patient_signup';
import DSignup from './screens/doctors/Doctor_signup';
import Home from './screens/Home';
import SDoctor from './screens/doctors/Single_doctor'
import Appointemt from './screens/Appointemt';
import AppointmentList from './screens/patients/AppointmentList';
import SendMessage from './screens/SendMessage';
import MyProfile from './screens/MyProfile';
import UpdateCalender from './screens/UpdateCalender';
import SearchBox from './components/common/SearchBox';

function App() {
const [data,setData] =  useState('')
useEffect(()=>{
  if(localStorage.getItem('userDetails')){
    setData(JSON.parse(localStorage.getItem('userDetails')).email)
  }
},[])




return(
  <Router>
    <Header />
     
     <main className="py-3">
        <Container>
        <Routes>
         
        
        <Route path="/" element={<Home />} /> 
        
        <Route path="/login" element={<Login />} />
        <Route path="/patient_signup" element={<PSignup />} />
        <Route path="/doctor_signup" element={<DSignup />} />
        {data?<Route path="/doctor/:id" element={<SDoctor />} />: <Route path="/" element={<Home />} /> }
        {data? <Route path="/doctor/:id/appointment/" element={<Appointemt />} /> : <Route path="/" element={<Home />} /> }
        {data? <Route path="/yourappointments/:email" element={<AppointmentList />} /> : <Route path="/" element={<Home />} /> }
        {data? <Route path="/message/:email/:id/" element={<SendMessage />} /> : <Route path="/" element={<Home />} /> }
        {data? <Route path="/profile/:email/" element={<MyProfile />} /> : <Route path="/" element={<Home />} /> }
        {data? <Route path="/updateCalender/:id/" element={<UpdateCalender />} /> : <Route path="/" element={<Home />} /> }
        {data ? <Route path="/searchDoctor/" element={<SearchBox />} /> : <Route path="/" element={<Home />} /> }
        </Routes>
        
        
        </Container>
      </main>
      <Footer />
  </Router>
)

}

export default App;
