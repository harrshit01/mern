import React from 'react'
import ProductDetails from '../features/product/components/ProductDetails'
import Navbar from "../features/navbar/Navbar.js";
import Footer from '../features/common/Footer';

const ProductDetail = () => {
  return (
    <>
    <Navbar>

      <ProductDetails/>
    </Navbar>
    <Footer/>
    </>

  )
}

export default ProductDetail