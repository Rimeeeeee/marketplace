// App.tsx
import React from 'react';
import { ThirdwebProvider } from 'thirdweb/react';

import AddProduct from './components/CreateProduct';

import ProductPage from './components/CreateProduct';
import Home from './components/Home';

function App() {
  return (
    <ThirdwebProvider>
      <Home />
      <AddProduct />
     
     
      <ProductPage />
    </ThirdwebProvider>
  );
}

export default App;
