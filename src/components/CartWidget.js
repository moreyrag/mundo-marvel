import React, {useContext} from 'react';
import { Badge, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {CartContext} from './store/CartContext';
import carrito from '../assets/cartIcono.png';
import './CartWidget.css';

function CartWidget() {
    const { getCantidadTotal } = useContext(CartContext)
    let cantidadArticulos = getCantidadTotal()
    return (
        <Link to="/cart">
            <div className='cartwidget'>
                {
                    cantidadArticulos>0 &&
                    <>
                        <Container>
                            <Row>
                                <Col>
                                    <img alt="carrito" src={carrito} className="carritoImg"/>
                                </Col>
                                <Col>
                                    <h4><Badge bg="warning" className='border border-dark rounded mt-2 cantidadArticulos'>{cantidadArticulos}</Badge></h4>
                                </Col>
                            </Row>
                        </Container>
                    </>
                }

            </div>
        </Link>
      );
}

export default CartWidget;