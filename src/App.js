// Estilo React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import ItemListContainer from './components/ItemListContainer';
import NotFound from './components/NotFound';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import {CartProvider} from './components/store/CartContext';
import './App.css';


function App() {
  
  return (
    <CartProvider>
      <div>
        <NavbarComp/>
        <Routes>
          <Route path="/" element={<ItemListContainer titulo="Todos los productos"/>}></Route>
          <Route path="/:categoria" element={<ItemListContainer/>}></Route>
          <Route path="/detalles/:idObjeto" element={<ItemDetailContainer/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
