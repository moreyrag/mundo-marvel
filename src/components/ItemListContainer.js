import { useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import ItemlList from './ItemlList';
import NotFound from './NotFound';
import './ItemListContainer.css';

const apiMarvelComics = "http://gateway.marvel.com/v1/public/comics?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"
// const apiMarvelPersonajes = "http://gateway.marvel.com/v1/public/characters?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"
// const apiMarvelSeries = "http://gateway.marvel.com/v1/public/series?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"
const inicioSlice = 5
const finSlice=17

function ItemListContainer({titulo}) {
    const [productos, setProductos] = useState([])
    const [isLoading, setLoading] = useState(true)

    const [newError, setError] = useState(null)

    const params = useParams()
    let tituloWeb

    const filtradoPorCategoria = (producto) =>{
        let filtrar = false
        switch (params.categoria) {
            case undefined: // es la raiz no filtrar nada, retornar todos los productos
                filtrar = true
                break;
            case "inicio":
                filtrar = true
                break;
            case "comics":
                filtrar = producto.categoria==="comic"
                break;
            case "personajes":
                filtrar = producto.categoria==="personaje"
                break;
            case "peliculas":
                filtrar = producto.categoria==="pelicula"
                break;
            default: 
                filtrar = false
                break;
        }

        return filtrar
    }
    // para no complicarme, los primeros 4 elementos son comics, los segundos 4 son personajes y los restantes 4 son peliculas
    const getProductos = () => {
        // demoro la lectura a la base de datos como se pide en el desafio
        setTimeout(
            () => fetch(apiMarvelComics)
                    .then(response=>{
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Respuesta de red OK pero respuesta HTTP no OK: " + response.statusText)
                        }
                    })
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

                        setProductos(prods)
                        setLoading(false)
                    })
                    .catch(error=>{
                        console.log(error)
                        setLoading(false)
                        setError(error.message)
                    }) 
            ,2000)
    }

    useEffect(()=>getProductos(), [params.categoria])

    function calculaTituloPagina() {
        if (titulo) {
            tituloWeb = titulo
        } else {
            switch (params.categoria) {
                case "inicio":
                    tituloWeb = "Todos los productos"
                    break;
                case "comics":
                    tituloWeb = "Comics"
                    break;
                case "personajes":
                    tituloWeb = "Personajes"
                    break;
                case "peliculas":
                    tituloWeb = "Peliculas"
                    break;
                default:
                    tituloWeb = undefined
                    break;
            }
        }
        return tituloWeb
    }

    return (
        <>
            {!calculaTituloPagina() && <NotFound/>}

            {
            calculaTituloPagina() && 
                <>
                    <main>
                        <div className='itemlistcont'>
                            <h2>{tituloWeb}</h2>
                            {
                                isLoading && 
                                    <Spinner animation="border" role="status"/>
                            }
                            {
                                newError &&
                                    <p>{newError}</p>
                            }

                            {/*correccion: el filtrado esta raro*/}
                            <ItemlList productos={productos.filter(filtradoPorCategoria)}/>
                        </div>
                    </main>
                    <footer></footer>
                </>
            }
        </>
    )
}

export default ItemListContainer;
