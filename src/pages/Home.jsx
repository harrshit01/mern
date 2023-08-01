import React from "react";
import Navbar from "../features/navbar/Navbar.js";
import ProductList from "../features/product/components/ProductList.js"
const Home = () => {
  return (
    <div>
      <Navbar>

      <ProductList/>
      </Navbar>
        
    </div>
  );
};

export default Home;
