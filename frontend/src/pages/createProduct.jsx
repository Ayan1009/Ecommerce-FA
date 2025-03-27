import { useState, useEffect } from "react";
import axios from '../axiosConfig';
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import NavBar from "../components/auth/nav";

const CreateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [email, setEmail] = useState("");

  const categoriesData = [
      { title: "Electronics" },
      { title: "Fashion" },
      { title: "Books" },
      { title: "Home Appliances" },
  ];

  useEffect(() => {
      if (isEdit) {
          axios
              .get(`/api/v2/product/product/${id}`)
              .then((response) => {
                  const p = response.data.product;
                  setName(p.name);
                  setDescription(p.description);
                  setCategory(p.category);
                  setTags(p.tags || "");
                  setPrice(p.price);
                  setStock(p.stock);
                  setEmail(p.email);
                  if (p.images && p.images.length > 0) {
                      setPreviewImages(
                          p.images.map((imgPath) => `http://localhost:8000${imgPath}`)
                      );
                  }
              })
              .catch((err) => {
                  console.error("Error fetching product:", err);
              });
      }
  }, [id, isEdit]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => prevImages.concat(files));
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => prevPreviews.concat(imagePreviews));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("email", email);

        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
          if (isEdit) {
            const response = await axios.put(`/api/v2/product/update-product/${id}`,formData);
            if (response.status === 200) {
                alert("Product updated successfully!");
                navigate("/my-products");
            }
        } else {
            const response = await axios.post("/api/v2/product/create-product", formData);
            if (response.status === 201) {
                alert("Product created successfully!");
                setImages([]);
                setPreviewImages([]);
                setName("");
                setDescription("");
                setCategory("");
                setTags("");
                setPrice("");
                setStock("");
                setEmail("");
            }
        }
    } catch (err) {
            console.error("Error creating/updating product:", err);
            alert("Failed to save product. Please check the data and try again.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="w-[90%] max-w-[500px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
                <h5 className="text-[24px] font-semibold text-center">
                    {isEdit ? "Edit Product" : "Create Product"}
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="pb-1 block">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="pb-1 block">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={description}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            className="w-full p-2 border rounded"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Choose a category</option>
                            {categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Tags</label>
                        <input
                            type="text"
                            value={tags}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter product tags"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={price}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter product price"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">
                            Stock <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={stock}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Enter stock quantity"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">
                            {isEdit ? "Upload New Images (optional)" : "Upload Images"}{" "}
                            <span className={isEdit ? "" : "text-red-500"}>*</span>
                        </label>
                        <input
                            name="image"
                            type="file"
                            id="upload"
                            className="hidden"
                            multiple
                            onChange={handleImagesChange}
                            required={!isEdit}
                        />
                        <label htmlFor="upload" className="cursor-pointer">
                        <svg
                                 width="30"
                                 height="30"
                                 fill="none"
                                 stroke="currentColor"
                                 className="text-gray-600"
                                 viewBox="0 0 24 24"
                             >
                                 <path
                                     d="M12 4v16m8-8H4"
                                     strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                 />
                             </svg>
                        </label>
                        <div className="flex flex-wrap mt-2">
                            {previewImages.map((img, index) => (
                                <img
                                    src={img}
                                    key={index}
                                    alt="Preview"
                                    className="w-[100px] h-[100px] object-cover m-2"
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                        {isEdit ? "Save Changes" : "Create"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateProduct;