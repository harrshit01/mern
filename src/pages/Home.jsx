import React from "react";
import Navbar from "../features/navbar/Navbar.js";
import Footer from "../features/common/Footer.js"
import ProductList from "../features/product/components/ProductList.js"
const Home = () => {
  return (
    <div>
      <Navbar>

      <ProductList/>
      </Navbar>
      <Footer/>
        
    </div>
  );
};

export default Home;
