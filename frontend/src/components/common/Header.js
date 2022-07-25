import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'


function Header() {

    const [userInfo,setUserinfo] = useState('')
    const [email,setEmail] = useState('')
    const [superuser,setSuperuser]=useState(false)
    const [image,setImage] = useState()
    const [role,setRole] = useState('')
 
    useEffect(()=>{
        const data= JSON.parse(localStorage.getItem('userDetails'))
        if(data){
            setUserinfo(data.first_name)
            setEmail(data.email)
            setSuperuser(data.is_superuser)
            setImage(data.image)
            setRole(data.role)
        }
        

    },[])

    
    
    
    const navigate= useNavigate()

    const logoutHandler= async(e)=>{
        
                
                localStorage.removeItem('userDetails')
                setUserinfo('')
                setSuperuser(false)
                
                navigate('/login')
                
     
        
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
                <Container>
                    <LinkContainer to='/' style={{borderRadius:"50%"}}>
                       <img src="https://tse1.mm.bing.net/th?id=OIP.VfGo9mRMwPHX-DFFqTEZZQHaF7&pid=Api&P=0"
                            width={50} height={50} alt=""/>
                        
                        
                    </LinkContainer>
                    <LinkContainer to='/' style={{margin:"10px",color:"white",cursor:"pointer"}}>
                    <h4>Doctor Consultancy</h4>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                       
                        
                        <Nav className="ml-auto">

                          

                            {userInfo || superuser ? (
                                <NavDropdown title={userInfo || 'Admin'} id='username'>
                                    <LinkContainer to={`/profile/${email}`}>
                                        <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={`/yourappointments/${email}/`}>
                                        <NavDropdown.Item>Appointments</NavDropdown.Item>
                                    </LinkContainer>
                                    {role === 'patient' &&
                                    <LinkContainer to={`/searchDoctor/`}>
                                        <NavDropdown.Item>Search the Doctor</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                    }

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <>
                                   <NavDropdown title={'Register'}>
                                   <LinkContainer to='/doctor_signup'>
                                   <NavDropdown.Item><i className="fas fa-user"></i>Doctor_signup</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/patient_signup'>
                                        <NavDropdown.Item><i className="fas fa-user"></i>Patient_signup</NavDropdown.Item>
                                    </LinkContainer>
                                   </NavDropdown>
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                </>
                                )}


                            {/* {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown> */}
                            {/* )} */}
                    <LinkContainer to={`/profile/${email}`} style={{borderRadius:"50%"}}>
                        <img src={image} alt="" width="50" height="50" />
                    </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
