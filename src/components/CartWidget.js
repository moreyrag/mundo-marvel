import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {CartContext} from './store/CartContext';
import carrito from '../assets/cartIcono.png';
import './CartWidget.css';

function CartWidget(/*{cantidadArticulos}*/) {
    const { getTotales } = useContext(CartContext)

    return (
        <Link to="/cart">
            <div className='cartwidget'>
                <img alt="carrito" src={carrito} className="carritoImg"/>
                <span className="cantidadArticulos">{getTotales().totalItems}</span>
            </div>
        </Link>
      );
}

export default CartWidget;