import {Button, Image} from 'react-bootstrap';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css'
import { CartContext } from './store/CartContext';

function CartItem({producto}) {
    const {removeItem} = useContext(CartContext)
    return (
        <tr>
            <td><Image src={producto.producto.imagenBig} className="mt-2 mb-2 imagenCartItem"></Image></td>
            <td>{producto.producto.titulo}</td>
            <td>{producto.producto.precio}</td>
            <td>{producto.cantidad}</td>
            <td><Link to={`/detalles/${producto.producto.id}`}> <Button size="sm" variant="warning" className='mb-1 mt-2'>Detalles</Button> </Link></td>
            <td><Button size="sm" variant="danger" className='mb-1 mt-2' onClick={()=>removeItem(producto.producto.id)}>Eliminar</Button></td>
        </tr>
    );
}

export default CartItem;
