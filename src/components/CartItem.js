import {Button, Container, Image, Row, Col} from 'react-bootstrap';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './store/CartContext';
import './CartItem.css'

function CartItem({producto}) {
    const {removeItem} = useContext(CartContext)
    return (
       <Container>
        <Row>
            <Col>
                <Image src={producto.producto.imagenBig} className="mt-2 mb-2 imagenCartItem"></Image>
            </Col>
            <Col>
                {producto.producto.titulo}
            </Col>
            <Col>
                U$S {producto.producto.precio}
            </Col>
            <Col>
                # {producto.cantidad}
            </Col>
            <Col>
                <Button size="sm" variant="danger" className='mb-1 mt-2' onClick={()=>removeItem(producto.producto.id)}>Eliminar</Button>
                <Link to={`/detalles/${producto.producto.id}`}> <Button size="sm" variant="warning" className='mb-1 mt-2'>Detalles</Button> </Link>
            </Col>
        </Row>
       </Container>
    );
}

export default CartItem;
