import React, {useState, useContext} from 'react';
import { Image, Table, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ItemCount from './ItemCount';
import {CartContext} from './store/CartContext';
import './ItemDetail.css';

function ItemDetail({det}) {

    const { addItemToCart, isInCart, carrito } = useContext(CartContext)

    // control para no mostrar una cantidad que en realidad exceda el stock disponible
    let inicial = isInCart(det.id)?carrito.find((item)=>det.id === item.producto.id).cantidad:det.initial

    const [cantItem, setCantItem] = useState(inicial)
    const [mostrarTerminarCompra, setTerminarCompra] = useState(false)

    const onAddHandler = (quantityToAdd)=>{
        setCantItem(quantityToAdd)
        setTerminarCompra(true)
        addItemToCart (det, quantityToAdd)
    }

    return (
        <main className='itemdetalle'>
            <Container>
                <Row>
                    <Col>
                        <Image src={det.imagen} className="mt-2 mb-2"></Image>
                    </Col>
                    <Col>
                        <h4><Badge bg="danger" className='border border-dark rounded mt-2'>{det.titulo}</Badge></h4>

                        <Table striped bordered hover variant="dark" responsive className='mt-2'>
                            <thead>
                                <tr>
                                    <th key={1}>Precio</th>
                                    <th key={2}>Stock</th>
                                    <th key={3}>Descripcion</th>
                                    <th key={4}>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{det.precio}</td>
                                    <td>{det.stock}</td>
                                    <td>{det.descripcion}</td>
                                    <td>{det.categoria}</td>
                                </tr>
                            </tbody>
                        </Table>
                        { !mostrarTerminarCompra? 
                            <ItemCount stock={det.stock} initial={cantItem} onAdd={onAddHandler}/>:
                            <>
                                <Link to="/cart"> <Button size="md" variant="info" className='mb-2 mt-2 mx-2'>Terminar compra</Button> </Link>
                                <Link to="/inicio"> <Button size="md" variant="success" className='mb-2 mt-2 mx-2'>Continuar comprando</Button> </Link>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
            
        </main>
      );
}

export default ItemDetail;
