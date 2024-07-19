import React, { useState, useEffect } from 'react';
import { useMarketplaceContext } from '../context/context'; // Adjust this import to your actual context
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { contract } = useMarketplaceContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const totalProducts = await contract.call('totalCountOfProducts');
        const productList: any[] = [];

        for (let i = 1; i <= totalProducts.toNumber(); i++) {
          const product = await contract.call('getProduct', [i]);
          productList.push({
            pid: i,
            price: product.price.toString(),
            name: product.name,
            description: product.description,
            image_hash: product.image_hash,
            totalCountType: product.totalCountType.toString()
          });
        }

        setProducts(productList);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [contract]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-welcome text-white p-4">
      <div className="w-full max-w-4xl space-y-8 white-glassmorphism p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.pid} className="p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-bold">Product ID: {product.pid}</h2>
                <p><strong>Price:</strong> {product.price}</p>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Image Hash:</strong> {product.image_hash}</p>
                <p><strong>Total Count:</strong> {product.totalCountType}</p>
                <Link
                  to={`/product/${product.pid}`}
                  className="text-blue-400 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products available.</p>
        )}

        <div className="w-full flex items-center justify-center">
          <Link
            to="/add-product"
            className="bg-green-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-green-600"
          >
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
