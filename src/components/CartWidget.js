import { Link } from 'react-router-dom';
import React, {useContext} from 'react';
import {CartContext} from './store/CartContext';
import carrito from '../assets/cartIcono.png';
import './CartWidget.css';

function CartWidget(/*{cantidadArticulos}*/) {
    const { getCantidadTotal } = useContext(CartContext)
    let cantidadArticulos = getCantidadTotal()
    return (
        <Link to="/cart">
            <div className='cartwidget'>
                <img alt="carrito" src={carrito} className="carritoImg"/>
                {
                    cantidadArticulos>0 &&
                    <span className="cantidadArticulos">{cantidadArticulos}</span>
                }

            </div>
        </Link>
      );
}

export default CartWidget;