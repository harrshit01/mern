import React from 'react';
import './App.css';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from "./pages/ProductDetail"


const App = () => {
  return (
    <> 
    <Router>
      <Routes >
        <Route path='/'element={<Home/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/productdetail' element={<ProductDetail/>}/>



      </Routes>
    </Router>
      
      
    </>
  )
}

export default App

