import React, { useContext } from 'react';
import { CartContext } from './store/CartContext';
import {Container, Row, Button, Toast, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import './Cart.css';

function Cart() {

    const {carrito, getCantidadTotal, getImporteTotal} = useContext(CartContext)

    return (
        <Container className="contenedorCarrito">
            <Row>
                {(carrito.length>0) &&
                    <Table striped bordered size='sm'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                carrito.map((producto) => (
                                    <CartItem key={producto.producto.id} producto={producto}/>
                                ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Cantidad total</th>
                                        <th>Importe total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{getCantidadTotal()}</td>
                                        <td>{getImporteTotal().toFixed(2)}</td>
                                        <td><Button variant='warning'>Realizar Pago</Button></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </tr>
                    </tfoot>
                </Table>
                } 
                
                {carrito.length===0 && 
                    <Link to="/inicio"> 
                            <Toast>
                        <Toast.Header>
                            <strong className="mx-auto">Carrito vacío</strong>
                            <small>Mundo Marvel</small>
                        </Toast.Header>
                        <Toast.Body className="mensajeCarritoVacio">
                        <Button size="sm" variant="warning" className='mb-1 mt-2'>
                                Ver Catalogo
                        </Button>
                        </Toast.Body>
                        </Toast>
                    </Link>
                }
            </Row>
        </Container>
    );
}

export default Cart;
