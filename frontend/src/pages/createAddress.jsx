import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/auth/nav";
import { useSelector } from "react-redux"; // Import useSelector

const CreateAddress = () => {
    const navigate = useNavigate();
    // Get email from Redux state
    const email = useSelector((state) => state.user.email);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressType, setAddressType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return alert("No email found in Redux state!");

        const addressData = {
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
            email,
        };
        try {
            const response = await axios.post("/api/v2/user/add-address", addressData);
            if (response.status === 201) {
                alert("Address added successfully!");
                navigate("/profile");
            }
        } catch (err) {
            console.error("Error adding address:", err);
            alert("Failed to add address. Please check the data and try again.");
        }
    };
    return (
        <>
            <NavBar />
            <div className="w-[90%] max-w-[500px] bg-white shadow h-auto rounded-[4px] p-4 mx-auto">
                <h5 className="text-[24px] font-semibold text-center">Add Address</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="pb-1 block">Country</label>
                        <input
                            type="text"
                            value={country}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Enter country"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">City</label>
                        <input
                            type="text"
                            value={city}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Address 1</label>
                        <input
                            type="text"
                            value={address1}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setAddress1(e.target.value)}
                            placeholder="Enter address 1"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Address 2</label>
                        <input
                            type="text"
                            value={address2}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setAddress2(e.target.value)}
                            placeholder="Enter address 2"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Zip Code</label>
                        <input
                            type="number"
                            value={zipCode}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="Enter zip code"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="pb-1 block">Address Type</label>
                        <input
                            type="text"
                            value={addressType}
                            className="w-full p-2 border rounded"
                            onChange={(e) => setAddressType(e.target.value)}
                            placeholder="Enter address type"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </>
    );
};
export default CreateAddress;