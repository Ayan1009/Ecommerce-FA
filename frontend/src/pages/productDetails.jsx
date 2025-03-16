import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/auth/nav";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { useSelector } from "react-redux"; // Import useSelector

export default function ProductDetails() {
    const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [quantity, setQuantity] = useState(1); // 1. Initialize quantity state
	// Get email from Redux state
	const email = useSelector((state) => state.user.email);
 
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/v2/product/product/${id}`
				);
				console.log("Fetched product:", response.data.product);
				setProduct(response.data.product); // Ensure correct state setting
				setLoading(false);
			} catch (err) {
				console.error("Error fetching product:", err);
				setError(err);
				setLoading(false);
			}
		};
		fetchProduct();
	}, [id]);
	// Log the updated product state whenever it changes
	useEffect(() => {
		if (product !== null) {
			console.log("Updated product state:", product);
			console.log("Product name:", product.name);
		}
	}, [product]);
	// 2. Handler to increment quantity
	const handleIncrement = () => {
		setQuantity((prevQuantity) => prevQuantity + 1);
	};
	// 3. Handler to decrement quantity, ensuring it doesn't go below 1
	const handleDecrement = () => {
		setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
	};
	const addtocart = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/v2/product/cart",
				{
					userId: email,
					productId: id,
					quantity: quantity,
				}
			);
			console.log("Added to cart:", response.data);
		} catch (err) {
			console.error("Error adding to cart:", err);
		}
	};
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl">Loading...</div>
			</div>
		);
	}
	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-red-500 text-xl">
					Error: {error.message}
				</div>
			</div>
		);
	}
	if (!product) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-gray-500 text-xl">No product found.</div>
			</div>
		);
	}
	return (
		<>
			<NavBar />
			<div className="container mx-auto p-6">
				<div className="bg-white drop-shadow-lg rounded-lg overflow-hidden">
					<div className="md:flex select-none">
						{/* Image Section */}
						<div className="w-full bsm:w-2/3 md:w-1/3 rounded-lg">
							{product.images && product.images.length > 0 ? (
								<img
									src={`http://localhost:8000${product.images[0]}`}
									alt={product.name}
									className="w-full h-full object-contain bsm:object-cover"
									style={{ maxHeight: "500px" }} // Adjust the max height as needed
								/>
							) : (
								<div className="w-full h-64 bg-gray-200 flex items-center justify-center">
									No Image Available
								</div>
							)}
						</div>
						{/* Information Section */}
						<div className="md:w-1/2 p-6">
							<h1 className="text-3xl font-semibold mb-4 text-gray-800">
								{product.name}
							</h1>
							<div className="mb-4">
								<h2 className="text-xl font-medium text-gray-700">
									Description
								</h2>
								<p className="text-gray-600 mt-2">
									{product.description}
								</p>
							</div>
							<div className="flex flex-wrap gap-x-5 my-2">
								<div>
									<h2 className="text-xl font-medium text-gray-700">
										Category
									</h2>
									<p className="text-gray-600 mt-2">
										{product.category}
									</p>
								</div>
								{product.tags && product.tags.length > 0 && (
									<div>
										<h2 className="text-xl font-medium text-gray-700">
											Tags
										</h2>
										<div className="mt-2 flex flex-wrap">
											{product.tags.map((tag, index) => (
												<span
													key={index}
													className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								)}
							</div>
							<div className="flex flex-wrap gap-x-5 mt-3 mb-5 items-start">
								<div className="flex flex-col gap-y-3">
									<h2 className="text-xl font-medium text-gray-700">
										Price
									</h2>
									<p className="text-gray-600 text-lg font-semibold">
										${product.price}
									</p>
								</div>
								{/* 4. Update Quantity Section */}
								<div className="flex flex-col gap-y-3">
									<div className="text-xl font-medium text-gray-700">
										Quantity
									</div>
									<div className="flex flex-row items-center gap-x-2">
										{/* 5. Attach onClick to Increment Button */}
										<div
											onClick={handleIncrement}
											className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
										>
											<IoIosAdd />
										</div>
										{/* 6. Display Current Quantity */}
										<div className="px-5 py-1 text-center bg-gray-100 rounded-xl pointer-events-none">
											{quantity}
										</div>
										{/* 7. Attach onClick to Decrement Button */}
										<div
											onClick={handleDecrement}
											className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 active:translate-y-1 p-2 rounded-xl cursor-pointer"
										>
											<IoIosRemove />
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-wrap gap-x-5 my-3">
								<button className="bg-black text-white px-5 py-2 rounded-full hover:bg-neutral-800 hover:-translate-y-1.5 active:translate-y-0 transition-transform duration-200 ease-in-out active:duration-0 active:ease-linear" onClick={addtocart}>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}