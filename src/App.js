import React from 'react';
import './App.css';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from "./pages/ProductDetail"
import Protected from './features/auth/components/Protected';


const App = () => {
  return (
    <> 
    <Router>
      <Routes >
        <Route path='/'element={<Protected><Home/> </Protected>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={<Protected><CartPage/> </Protected>}/>
        <Route path='/checkout' element={<Protected><Checkout/> </Protected>}/>
        <Route path='/productdetail/:id' element={<Protected><ProductDetail/> </Protected>}/>



      </Routes>
    </Router>
      
      
    </>
  )
}

export default App

