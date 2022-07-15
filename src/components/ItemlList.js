import {Container, Row} from 'react-bootstrap';
import Item from './Item';
import './ItemlList.css';

function ItemlList({productos}) {

    return (
        <Container fluid="md">
            <Row className="justify-content-md-center">
                {productos && productos.map((producto) => (
                        <Item key={producto.id} producto={producto}/>
                ))}
            </Row>
        </Container>
          );
}

export default ItemlList;
