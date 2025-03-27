import React, { useEffect, useState } from "react";
import Product from "../components/auth/Product";
import NavBar from "../components/auth/nav";
import axios from "../axiosConfig";

export default function Home() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true); // For loading state
const [error, setError] = useState(null); // For error handling

useEffect(() => {
  axios.get("/api/v2/product/get-products")
    .then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      setError(err.message);
      setLoading(false);
    });
}, []);
if (loading) {
  return (
    <div className="text-center text-white mt-10">Loading products...</div>
  );
}
if (error) {
  return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
}

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen bg-neutral-800">
        <h1 className="text-3xl text-center text-white py-6">Product Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}