import React, { useContext, useEffect, useState } from 'react';
import {Container, Row, Button, Toast, Stack} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import { getFirestore, addDoc, collection } from 'firebase/firestore';

import CartItem from './CartItem';
import FormDatosComprador from './FormDatosComprador';
import { CartContext } from './store/CartContext';
import './Cart.css';

function Cart() {

    const {carrito, getCantidadTotal, getImporteTotal, clearCarrito} = useContext(CartContext)
    const [showForm, setShowForm] = useState(false);

    let cantidadTotal = getCantidadTotal()
    useEffect(()=>{
        setShowForm(false)
    }, [cantidadTotal])

    const showInfoOrder = (idOrden)=>{
        Swal.fire(
            'Gracias por elegirnos!',
            'Su orden ' + idOrden + ' esta en camino!!',
            'success'
          )
    }

    const addOrderHandler=(datosComprador) =>{
        const order={
            comprador: datosComprador,
            cantidadProductos: cantidadTotal,
            importeTotal: getImporteTotal(),
            date: new Date()
        }

        const db = getFirestore()
        const ordersCollection = collection(db, "orders")
        addDoc(ordersCollection, order).then((doc)=>{showInfoOrder(doc.id)})
        clearCarrito()
    }

    return (
        <main>
        <Container className="contenedorCarrito">
            <Row className='filaItemsCarrito'>
                {
                    (cantidadTotal>0) && 
                        <Stack gap={2}>
                            {
                            carrito.map((producto) => (
                                <div className="bg-light border">
                                        <CartItem key={producto.producto.id} producto={producto}/>
                                </div>
                                    ))
                            }
                        </Stack>
                } 
                
                {
                    cantidadTotal===0 && 
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
            <Row>
                {
                    <Stack direction="horizontal" gap={3} className="mt-2">
                        <div className="bg-light border p-1">Cantidad total:# {cantidadTotal}</div>
                        <div className="vr" />
                        <div className="bg-light border p-1">Importe total:U$S {getImporteTotal().toFixed(2)}</div>
                    </Stack>
                }
            </Row>
            <Row>
                {
                    cantidadTotal!==0 && !showForm && 
                        <Stack direction="horizontal" gap={3} className="mt-5 botonesCarrito">
                            <Button variant='danger' size="md" onClick={()=>clearCarrito()}>Limpiar Carrito</Button>
                            <Link to="/inicio"> <Button size="md" variant="success" className='mb-2 mt-2 mx-2'>Continuar comprando</Button> </Link>
                            <Button className='m-2' variant='warning' size="md" onClick={()=>setShowForm(true)}>Realizar Pago</Button>
                        </Stack>
                }
            </Row>
            <Row>
                {showForm && <FormDatosComprador onSaveOrder={addOrderHandler}/>}
            </Row>
        </Container>
        </main>
    );
}

export default Cart;
