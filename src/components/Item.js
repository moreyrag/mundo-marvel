import Card from 'react-bootstrap/Card';
import { Button, Container, Row, Col} from 'react-bootstrap';
import ItemDetailContainer from './ItemDetailContainer'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Item.css'

function Item({producto}) {
    const [conDetalles, setConDetalles] = useState(false)
    return (
        <Card
            // bg={'primary'}
            key={producto.id}
            // text={'white'}
            style={{ width: '15rem'}}
            className="mb-2 mx-2 cardMundoMarvel"
            >
                <Card.Header>
                    <Card.Title>{producto.titulo}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Img src={producto.imagenBig}/>
                    <Card.Text className='mt-1 mb-1 datosPrecio'>U$S {producto.precio}</Card.Text>
                </Card.Body>
                <Card.Footer className='justify-content-md-center'>
                    <Container>
                        <Row className='justify-content-center'>
                            <Card.Text className='mt-1 datosStock' size="sm">stock: {producto.stock}</Card.Text>
                        </Row>
                        <Row>
                            <Link to={`/detalles/${producto.id}`}> <Button size="sm" variant="warning" className='mb-1 mt-2' onClick={()=><ItemDetailContainer/>}>Detalles</Button> </Link>
                        </Row>
                    </Container>
                </Card.Footer>
        </Card>
      );
}

export default Item;

