import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Product({ _id, name, images, description, price }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (!images || images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images]);

    const currentImage = images && images.length > 0 ? images[currentIndex] : null;

    const handleEdit = () => {
        navigate(`/create-product/${_id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v2/product/delete-product/${_id}`
            );
            if (response.status === 200) {
                alert("Product deleted successfully!");
                // Reload the page or fetch products again
                window.location.reload();
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product.");
        }
    };
    
    return (
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="w-full">
                {currentImage && (
                    <img
                        src={`http://localhost:8000${currentImage}`}
                        alt={name}
                        className="w-full h-56 object-cover rounded-lg mb-2"
                    />
                )}
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm opacity-75 mt-2">{description}</p>
            </div>
            <div className="w-full mt-4">
                <p className="text-lg font-bold my-2">${price.toFixed(2)}</p>
                <button
                    className="w-full text-white px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-700 transition duration-300"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="w-full text-white px-4 py-2 rounded-md bg-red-600 hover:bg-red-400 transition duration-300 mt-2"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Product;