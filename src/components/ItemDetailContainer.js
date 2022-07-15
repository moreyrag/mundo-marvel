import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import ItemDetail from './ItemDetail';
import './ItemDetailContainer.css';

// const apiMarvelComicEspecifico = "http://gateway.marvel.com/v1/public/comics/"+params.idObjeto+"?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"

// uso el mismo endpoint que en ItemListContainer a los efectos de prueba para tener el mismo criterio para determinar la categoria del "producto"
const apiMarvelComicEspecifico = "http://gateway.marvel.com/v1/public/comics?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"
const inicioSlice = 5
const finSlice=17

function ItemDetailContainer() {
    const {idObjeto} = useParams()
    const [producto, setProducto] = useState()
    const [isLoading, setLoading] = useState(true)
    // console.log(params.idObjeto)

    const getItem = () => {
        setTimeout(
            () => fetch(apiMarvelComicEspecifico)
                    .then(resp=>resp.json())
                    .then(json=>{
                        // armo los productos, por ahora todo con stock, initial fijas
                        let prodTemp = json.data.results.slice(inicioSlice, finSlice) // 12 elementos
                        let prods = []
                        let imagenBig, imagen, id, precio, stock, initial, categoria, descripcion, titulo
                        prods = prodTemp.map((producto, i)=>{
                            id = producto.id
                            titulo=producto.title
                            descripcion = producto.description
                            imagen = producto.thumbnail.path+"."+producto.thumbnail.extension
                            // imagenBig = (producto.images[0].path+"."+producto.images[0].extension)??imagen
                            imagenBig=imagen
                            precio = producto.prices[0].price
                            stock = 5
                            initial = 1
                            // 4 comics, 4 characters, 4 movies
                            categoria = i<4?"comic":i<8?"personaje":"pelicula"
                            return {"id":id, "titulo":titulo, "descripcion":descripcion, "imagen":imagen, "imagenBig":imagenBig,
                                        "precio":precio, "stock":stock, "initial":initial, "categoria":categoria
                                    }
                        })

                        setProducto(prods.find((elemento)=>elemento.id===parseInt(idObjeto)))
                        setLoading(false)
                    })
            ,2000)
    }

    useEffect(()=>getItem(), [])

    return (
        <>
            {isLoading && 
                <Container>
                    <Row className="justify-content-md-center mt-2">
                        <Spinner animation="border" role="status"/>
                    </Row>
                </Container>
            }

            {producto!==undefined && 
                <>
                    <ItemDetail det={producto}/>
                </>
            }
        </>
    );
}

export default ItemDetailContainer;