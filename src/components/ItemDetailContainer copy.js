import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemDetail from './ItemDetail';
import './ItemDetailContainer.css';

function ItemDetailContainer() {
    const params = useParams()
    const [producto, setProducto] = useState()
    // console.log(params.idObjeto)
    // const apiMarvelComicEspecifico = "http://gateway.marvel.com/v1/public/comics/"+params.idObjeto+"?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"

    // uso el mismo endpoint que en ItemListContainer a los efectos de prueba para tener el mismo criterio para determinar la categoria del "producto"
    const apiMarvelComicEspecifico = "http://gateway.marvel.com/v1/public/comics?ts=800&apikey=3ceb8ff24dc4d49fdaee65eead1e324b&hash=2ead2cfcc192f817052d71a377488092"

    const getItem = () => {
        setTimeout(
            () => fetch(apiMarvelComicEspecifico)
                    .then(resp=>resp.json())
                    .then(json=>{
                        // podría ser json.data.results[0] sin hacer el find, no queda claro en la documentacion de la API
                        // https://developer.marvel.com/docs#!/public/getComicIndividual_get_7
                        let prodTemp = json.data.results.find((elemento)=>elemento.id===parseInt(params.idObjeto))
                        // console.log(prodTemp)

                        // stock, initial y categoria fijas para "simular", porque la api no tiene esta información
                        prodTemp = {"id":prodTemp.id, "titulo":prodTemp.title, "descripcion":prodTemp.description, "imagen":prodTemp.images[0].path+"."+prodTemp.images[0].extension, "imagenBig":prodTemp.images[0].path+"."+prodTemp.images[0].extension,
                            "precio":prodTemp.prices[0].price, "stock":5, "initial":1, "categoria":"comic"
                            }
                        setProducto(prodTemp)
                        })
            ,2000)
    }

    useEffect(()=>{
        getItem()
    }, [])

    return (
        <>
            {producto!=undefined && <ItemDetail det={producto}/>}
        </>
    );
}

export default ItemDetailContainer;