import React, { useEffect, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'

import ItemlList from './ItemlList';
import NotFound from './NotFound';
import './ItemListContainer.css';

function ItemListContainer({titulo}) {
    const [productos, setProductos] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [newError, setError] = useState(null)

    const params = useParams()
    let tituloWeb

    const categoriaFiltrar = ()=>{
        let filtrar = "todas"
        switch (params.categoria) {
            case "comics":
                filtrar = "comic"
                break;
            case "personajes":
                filtrar = "personaje"
                break;
            case "peliculas":
                filtrar = "pelicula"
                break;
            default: 
                break;
        }

        return filtrar
    }

    const getProductos = () => {
        const db = getFirestore()
        let mundoMarvelProds
        setLoading(true)
        setError(null)
        
        let prods = []

        setTimeout(
            () => {
                if (categoriaFiltrar()==="todas") {
                    mundoMarvelProds = query(collection(db, "items"))
                } else {
                    mundoMarvelProds = query(collection(db, "items"), where("categoria", "==", categoriaFiltrar()))
                }

                getDocs(mundoMarvelProds).then((items)=>{
                    if (items.size===0){
                        throw new Error("Error obteniendo los productos del catálogo!!")
                    }
                    prods = items.docs.map((item)=>item.data())
                    setProductos(prods)
                    setLoading(false)
                }).catch(error=>{
                    setError(error.message)
                    setLoading(false)
                })
            }
            ,2000)
    }

    useEffect(()=>{getProductos()}, [params.categoria])

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
                            
                            {newError !==null &&
                                    newError}
    
                            { !isLoading &&
                                <ItemlList productos={productos}/>
                            }
                        </div>
                    </main>
                    <footer></footer>
                </>
            }
        </>
    )
}

export default ItemListContainer;
