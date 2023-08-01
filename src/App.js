import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from "./pages/ProductDetail"
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotfound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/ForgotPassword';


const App = () => {
  
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch, user])

  return (
    <> 
    <Router>
      <Routes >
        <Route path='/'element={<Protected><Home/> </Protected>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={<Protected><CartPage/> </Protected>}/>
        <Route path='/checkout' element={<Protected><Checkout/> </Protected>}/>
        <Route path='/productdetail/:id' element={<Protected><ProductDetail/></Protected>}/>
        <Route path='/ordersuccess/:id' element={<Protected><OrderSuccess/></Protected>}/>
        <Route path='/orders' element={<Protected><UserOrderPage/></Protected>}/>
        <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>


        <Route path='*' element={<PageNotfound/>}/>




      </Routes>
    </Router>
      
      
    </>
  )
}

export default App

