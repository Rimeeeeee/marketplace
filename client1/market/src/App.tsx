// App.tsx
import React from 'react';
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddProduct from './components/CreateProduct';

import ProductPage from './components/CreateProduct';
import Home from './components/Home';
export const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
});
function App() {
  return (
    
    <ThirdwebProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/product/pid" element={<ProductPage/>} />
       
      </Routes>
    </Router>
  </ThirdwebProvider>
  );
}

export default App;
