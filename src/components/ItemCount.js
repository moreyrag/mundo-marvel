import React, {useState} from "react"
import Button from 'react-bootstrap/Button';
import './ItemCount.css';

function ItemCount({stock, initial, onAdd}) {
    if (initial < 0){
        initial = 0
    }

    if (stock < 0){
        stock = 0
    }

    if (stock < initial){
        initial = stock
    }

    const [num, setNum] = useState(initial)
    const [disableMenos, setDisableMenos] = useState(initial<1)
    const [disableMas, setDisableMas] = useState(initial===stock)

    const sumarUno = (e) => {
        e.preventDefault()
        setDisableMenos(false)
        if (num===(stock-1)){
            setDisableMas(true)
        }
        setNum(num+1)
    }

    const restarUno = (e) => {
        e.preventDefault()
        setDisableMas(false)
        if (num===1){
            setDisableMenos(true)
        }
        setNum(num-1)
    }

    return (
        <>
            <div>
                <Button size="sm" variant="danger" onClick={restarUno} disabled={disableMenos}>-</Button>
                <span className="badge badge-light">{num}</span>
                <Button size="sm" variant="success" onClick={sumarUno} disabled={disableMas}>+</Button>
            </div>
            { num!==0 && 
            <div>
                <Button size="md" variant="warning" className='mb-2 mt-2' onClick={()=> onAdd(num)}>Agregar al carrito</Button>
            </div>
            }
        </>
      );
}

export default ItemCount;