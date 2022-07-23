import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logoMarvel.svg';
import WelcomeComp from './WelcomeComp';
import CartWidget from './CartWidget';
import './NavbarComp.css';


function NavbarComp() {
    return (
      <header>
        <Navbar bg="primary" fg="warning" expand="lg">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Navbar.Brand>
                  <NavLink to="/inicio">
                    <img
                      src={logo}
                      className="d-inline-block align-top"
                      alt="Mundo Marvel"
                    />
                  </NavLink>
                </Navbar.Brand>
                <NavLink className="navA mx-2" to="/inicio">Inicio</NavLink>
                <NavLink className="navA mx-2" to="/comics">Comics</NavLink>
                <NavLink className="navA mx-2" to="/personajes">Personajes</NavLink>
                <NavLink className="navA mx-2" to="/peliculas">Peliculas</NavLink>
              </Nav>
              <WelcomeComp nombreUsuario="Gustavo"/>
              <CartWidget/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </header>
      );
}

export default NavbarComp;

