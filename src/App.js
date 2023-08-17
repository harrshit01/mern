import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from "./pages/ProductDetail"
import PageNotfound from './pages/404';
import OrderSuccess from './pages/OrderSuccess';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminHome from './pages/AdminHome';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import Protected from './features/auth/components/Protected';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import Logout from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { RotatingLines } from 'react-loader-spinner';
import StripeCheckout from './pages/StripeCheckout';
import ResetPasswordPage from './pages/ResetPasswordPage';



const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <>
    {userChecked?
      <Router>
        <Routes >
          <Route path='/' element={<Protected><Home /> </Protected>} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/cart' element={<Protected><CartPage /> </Protected>} />
          <Route path='/checkout' element={<Protected><Checkout /> </Protected>} />
          <Route path='/productdetail/:id' element={<Protected><ProductDetail /></Protected>} />
          <Route path='/ordersuccess/:id' element={<Protected><OrderSuccess /></Protected>} />
          <Route path='/orders' element={<Protected><UserOrderPage /></Protected>} />
          <Route path='/profile' element={<Protected><UserProfilePage /></Protected>} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword' element={<ResetPasswordPage />} />
          <Route path='/admin' element={<ProtectedAdmin><AdminHome /></ProtectedAdmin>} />
          <Route path='/admin/productform' element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
          <Route path='/admin/productform/edit/:id' element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
          <Route path='/admin/orders' element={<ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>} />
          <Route path='/stripecheckout' element={<Protected><StripeCheckout /></Protected>} />


          <Route path='*' element={<PageNotfound />} />




        </Routes>
      </Router>: 
      <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}/>
}
    
    </>
  )
}

export default App

