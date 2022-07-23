import React, {useState, createContext} from "react";

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

    const getCantidadTotal = () =>{
        let cantidades = carrito.map((item)=>item.cantidad)
        return cantidades.reduce((total, cantidad) => total + cantidad, 0)
    }

    const getImporteTotal = () =>{
        let importes = carrito.map((item)=>{
            return (item.cantidad * item.producto.precio)
        })
        return importes.reduce((total, importe) => total + importe, 0)
    }


    const addItemToCart = (producto, cantidad) =>{
        if (isInCart(producto.id)) {
            const newCarrito = [...carrito]
            for (const element of newCarrito) {
                if (element.producto.id === producto.id) {
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
        getCantidadTotal,
        getImporteTotal,
        addItemToCart,
        carrito
    }

    return(
        <Provider value={context}>
            {children}
        </Provider>
    )
}
