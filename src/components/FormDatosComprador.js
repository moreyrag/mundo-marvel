import React, { useState } from 'react';
import {Form, Row, Button, Container} from 'react-bootstrap';
import './FormDatosComprador.css'

function FormDatosComprador({onSaveOrder}) {

const [newFullName, setNewFullName] = useState("")
const [newPhone, setNewPhone] = useState("")
const [newEmail, setNewEmail] = useState("")

const fullNameHandler = (event) =>{
  setNewFullName(event.target.value)
}
const phoneHandler = (event) =>{
  setNewPhone(event.target.value)
}
const emailHandler = (event) =>{
  setNewEmail(event.target.value)
}
const submitHandler = (event) =>{
  event.preventDefault()

  if (newFullName!==undefined && newPhone!==undefined && newEmail!==undefined 
    && newFullName.length>0 && newPhone.length>0 && newEmail.length>0){
    const newBuyer={
      fullName:newFullName,
      phone:newPhone,
      email:newEmail
    }
    onSaveOrder(newBuyer)
  }
}

  return (
    <Form onSubmit={submitHandler}>
      <Container className='formDatosComprador'>
        <Row>
          <div>
            <Form.Control onChange={fullNameHandler} className="mt-5" type="text" placeholder="Nombres y Apellidos (solo letras)" pattern="([A-Z]|[a-z])([A-Z]|[a-z])*" required/>
          </div>
        </Row>
        <Row>
          <div>
            <Form.Control onChange={phoneHandler} className="mt-2" type="text" placeholder="Telefono 123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
          </div>
        </Row>
        <Row>
          <div>
            <Form.Control onChange={emailHandler} className="mt-2" type="email" placeholder="Email" required/>
          </div>
        </Row>
        <Row>
          <div><Button className="mt-2" type='submit' size='sm' variant='primary'>Enviar</Button></div>
        </Row>
      </Container>
    </Form>
  );
}

export default FormDatosComprador;

