// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Navbar,Nav,NavDropdown} from "react-bootstrap";

function Header() {
  const navigate = useNavigate();
  const logout = () => {
    // Perform logout actions here
    // Clear login status from localStorage
    console.log('logout..');
    localStorage.setItem('currentUsername', '');
    navigate("/");    
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">Logo here</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">            
            {localStorage.getItem('currentUsername') ? (
            <>
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title={localStorage.getItem('currentUsername')} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            </>
            ) : (
            <>
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href='/register'>Register</Nav.Link>
            </>
            )}            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
