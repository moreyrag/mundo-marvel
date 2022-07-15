import { useContext } from 'react';
import { CartContext } from './store/CartContext';
import {Container, Row} from 'react-bootstrap';
import './Cart.css';

function Cart() {

    const {carrito, getTotales} = useContext(CartContext)
    let {totalItems, importeTotal} = getTotales()

    return (
        <main>
            <div>
                <h2>Cart</h2>
                <Container fluid="md">
                        {carrito.map((item) => (
                        <Row key={item.producto.id} className="justify-content-md-center">
                            <p>{item.producto.titulo}</p>
                            <p>{item.cantidad}</p>
                            <p>------------------</p>
                        </Row>
                        ))}
                        <p>------------------</p>
                        <p>------------------</p>
                        <Row>
                            <p> {totalItems}</p>
                            <p> {importeTotal}</p>
                        </Row>
                </Container>
            </div>
        </main>
    );
}

export default Cart;
