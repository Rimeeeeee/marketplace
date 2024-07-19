import React, { useState, useEffect } from 'react';
import { prepareContractCall, sendTransaction } from 'thirdweb';
import { useMarketplaceContext } from '../context/context'; // Adjust this import to your actual context
import { useActiveAccount } from 'thirdweb/react';
import { Link } from 'react-router-dom';
import { createWallet } from 'thirdweb/wallets';

const ProductPage: React.FC = () => {
  const [pid, setPid] = useState<number | "">("");
  const [product, setProduct] = useState<any>(null);
  const [discount, setDiscount] = useState<number | "">("");
  const [newProductCount, setNewProductCount] = useState<number | "">("");
  const [buyCount, setBuyCount] = useState<number | "">("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { contract, client } = useMarketplaceContext();
  const address = useActiveAccount()?.address;

  useEffect(() => {
    if (pid !== "") {
      const fetchProduct = async () => {
        try {
          const data = await contract.call('getProduct', [pid]);
          setProduct(data);
        } catch (err) {
          console.error("Failed to fetch product", err);
        }
      };
      fetchProduct();
    }
  }, [pid]);

  const handleEnableDiscount = async () => {
    try {
      if (pid !== "" && discount !== "") {
        const wallet = createWallet("io.metamask");
        const account = await wallet.connect({ client });

        const transaction = await prepareContractCall({
          contract,
          method: "enableDiscount",
          params: [pid, discount],
        });

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });

        if (transactionHash) {
          setSuccessMessage("Discount applied successfully!");
        }
      } else {
        setErrorMessage("Please fill in all fields.");
      }
    } catch (err) {
      console.error("Failed to apply discount", err);
      setErrorMessage("Failed to apply discount.");
    }
  };

  const handleUpdateProductCount = async () => {
    try {
      if (pid !== "" && newProductCount !== "") {
        const wallet = createWallet("io.metamask");
        const account = await wallet.connect({ client });

        const transaction = await prepareContractCall({
          contract,
          method: "updateProductCount",
          params: [pid, newProductCount],
        });

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });

        if (transactionHash) {
          setSuccessMessage("Product count updated successfully!");
        }
      } else {
        setErrorMessage("Please fill in all fields.");
      }
    } catch (err) {
      console.error("Failed to update product count", err);
      setErrorMessage("Failed to update product count.");
    }
  };

  const handleBuyProduct = async () => {
    try {
      if (pid !== "" && buyCount !== "" && buyerAddress && buyerEmail) {
        const wallet = createWallet("io.metamask");
        const account = await wallet.connect({ client });

        const transaction = await prepareContractCall({
          contract,
          method: "buyProduct",
          params: [pid, buyCount, buyerAddress, buyerEmail],
        });

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });

        if (transactionHash) {
          setSuccessMessage("Product purchased successfully!");
        }
      } else {
        setErrorMessage("Please fill in all fields.");
      }
    } catch (err) {
      console.error("Failed to buy product", err);
      setErrorMessage("Failed to buy product.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-welcome text-white p-4">
      <div className="w-full max-w-md space-y-8 white-glassmorphism p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Management</h1>
        
        {/* Product Details */}
        <div>
          <label className="block mb-2 text-lg">Product ID</label>
          <input
            type="number"
            value={pid}
            onChange={(e) => setPid(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter product ID"
          />
          <button
            onClick={() => setPid(pid)} // Trigger useEffect to fetch product
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            Fetch Product Details
          </button>

          {product && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-bold">Product Details</h2>
              <p><strong>Price:</strong> {product.price.toString()}</p>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Image Hash:</strong> {product.image_hash}</p>
              <p><strong>Total Count:</strong> {product.totalCountType.toString()}</p>
            </div>
          )}
        </div>

        {/* Enable Discount */}
        <div>
          <label className="block mb-2 text-lg">Enable Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter discount amount"
          />
          <button
            onClick={handleEnableDiscount}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Apply Discount
          </button>
        </div>

        {/* Update Product Count */}
        <div>
          <label className="block mb-2 text-lg">Update Product Count</label>
          <input
            type="number"
            value={newProductCount}
            onChange={(e) => setNewProductCount(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter new product count"
          />
          <button
            onClick={handleUpdateProductCount}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Update Count
          </button>
        </div>

        {/* Buy Product */}
        <div>
          <label className="block mb-2 text-lg">Buy Product</label>
          <input
            type="number"
            value={buyCount}
            onChange={(e) => setBuyCount(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter quantity"
          />
          <input
            type="text"
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter buyer address"
          />
          <input
            type="email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter buyer email"
          />
          <button
            onClick={handleBuyProduct}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
          >
            Buy Product
          </button>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <h2 className="bg-green-500 text-black rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
            {successMessage}
          </h2>
        )}
        {errorMessage && (
          <h2 className="bg-red-500 text-white rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
            {errorMessage}
          </h2>
        )}

        <div className="w-full flex items-center justify-center">
          <Link
            to="/"
            className="bg-gray-500 text-white py-2 px-4 mt-1 rounded-md hover:bg-gray-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
