import React, { useState, useEffect } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useMarketplaceContext } from "../context/context"; // Adjust this import to your actual context
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Link } from "react-router-dom";
import { createWallet } from "thirdweb/wallets";

const AddProduct: React.FC = () => {
  const [price, setPrice] = useState<number | "">("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageHash, setImageHash] = useState("");
  const [totalCountType, setTotalCountType] = useState<number | "">("");
  const [productSuccess, setProductSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { contract, client } = useMarketplaceContext(); // Adjust according to your context setup
  const address = useActiveAccount()?.address;
  const OWNER = import.meta.env.VITE_OWNER as string;

  useEffect(() => {
    if (address === OWNER) {
      // Handle owner-specific logic if needed
    }
  }, [address]);

  const handleAddProduct = async () => {
    try {
      if (price !== "" && name && description && imageHash && totalCountType !== "") {
        const wallet = createWallet("io.metamask");
        const account = await wallet.connect({ client });

        const transaction = await prepareContractCall({
          contract,
          method: "createProduct",
          params: [
            price,
            name,
            description,
            imageHash,
            totalCountType
          ],
        });

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });

        if (transactionHash) {
          setProductSuccess(true);
        }

        setTimeout(() => setProductSuccess(false), 3000); // Hide message after 3 seconds
        setPrice("");
        setName("");
        setDescription("");
        setImageHash("");
        setTotalCountType("");
      } else {
        setError("Please fill all fields correctly.");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-welcome text-white p-4">
      <div className="w-full max-w-md space-y-8 white-glassmorphism p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Product</h1>
        <div>
          <label className="block mb-2 text-lg">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter product description"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Image Hash</label>
          <input
            type="text"
            value={imageHash}
            onChange={(e) => setImageHash(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter image hash"
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Total Count Type</label>
          <input
            type="number"
            value={totalCountType}
            onChange={(e) => setTotalCountType(Number(e.target.value))}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter total count type"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
        >
          Add Product
        </button>
        {productSuccess && (
          <h2 className="bg-green-500 text-black rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
            Product Added Successfully!
          </h2>
        )}
        {error && (
          <h2 className="bg-red-500 text-white rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
            {error}
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

export default AddProduct;
