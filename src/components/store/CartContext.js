import {useState, createContext} from "react";

export const CartContext = createContext({})
const {Provider} = CartContext

export const CartProvider = ({defaultValue=[], children}) => {
    const [carrito, setCarrito] = useState(defaultValue)

    const clearCarrito = () => {
        setCarrito([])
    }

    const isInCart = (prodId) => {
        return carrito.some((item) => item.producto.id === prodId)
    }

    const removeItem = (prodId) => {
        const newCarrito = carrito.filter((item) => item.producto.id !== prodId)
        setCarrito(newCarrito)
    }

    const getTotales = () =>{
        let cantidades = carrito.map((item)=>item.cantidad)
        console.log(cantidades)
        let importes = carrito.map((item)=>{
            return (item.cantidad * item.producto.precio)
        })
        console.log(importes)
        let totalItems = cantidades.reduce((total, cantidad) => total + cantidad, 0)
        let importeTotal = importes.reduce((total, importe) => total + importe, 0)
        return {"totalItems":totalItems, "importeTotal":importeTotal}
    }


    const addItemToCart = (producto, cantidad) =>{
        /* 
        Se controla en ItemDetail (en realidad en ItemCount) que la cantidad no exceda el stock, 
        por eso no se suma como se observa en la linea comentada 
        */
        if (isInCart(producto.id)) {
            const newCarrito = [...carrito]
            for (const element of newCarrito) {
                if (element.producto.id === producto.id) {
                    // element.cantidad+=cantidad
                    element.cantidad=cantidad
                }
            }
            setCarrito(newCarrito)
        } else {
            setCarrito(
                [
                    ...carrito,
                    {
                        producto: producto,
                        cantidad: cantidad
                    }
                ]
            )    
        }
    }

    const context = {
        clearCarrito,
        isInCart,
        removeItem,
        getTotales,
        addItemToCart,
        carrito
    }

    return(
        <Provider value={context}>
            {children}
        </Provider>
    )
}
