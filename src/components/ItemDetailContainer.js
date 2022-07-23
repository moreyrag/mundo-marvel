import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import {getFirestore, collection, getDocs, query, where} from 'firebase/firestore'

import ItemDetail from './ItemDetail';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
    const {idObjeto} = useParams()
    const [producto, setProducto] = useState()
    const [isLoading, setLoading] = useState(true)
    const [newError, setError] = useState(null)

    const getItem = () => {
        const db = getFirestore()
        let mundoMarvelProds
        setLoading(true)

        setTimeout(
            () => {
                mundoMarvelProds = query(collection(db, "items"), where("id", "==", parseInt(idObjeto)))
                
                getDocs(mundoMarvelProds).then((items)=>{
                    setProducto(items.docs[0].data())
                    setLoading(false)
                }).catch(error=>{
                    console.log(error)
                    setLoading(false)
                    setError(error.message)
                })
            }
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
                    {
                        newError && <p>{newError}</p>
                    }
                    <ItemDetail det={producto}/>
                </>
            }
        </>
    );
}

export default ItemDetailContainer;