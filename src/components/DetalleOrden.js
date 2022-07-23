import React from 'react';
import './DetalleOrden.css';

function DetalleOrden({ordenId}) {
    console.log(ordenId)

    return (
        <h1>{ordenId}</h1>
    );
}

export default DetalleOrden;