import React from "react";
import Navbar from "../features/navbar/Navbar.js";
import Footer from "../features/common/Footer.js";
import ProductList from "../features/product/components/ProductList.js";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../features/product/ProductSlice.js";
const Home = () => {
  const products = useSelector(selectAllProducts);

  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
      <Footer />
    </div>
  );
};

export default Home;
