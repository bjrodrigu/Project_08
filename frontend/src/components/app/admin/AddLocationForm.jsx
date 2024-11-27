import React, { useState } from "react";
import { addLocation } from "../../utils/api";

const AddLocationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        category: "",
        buildingName: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addLocation(formData);
            alert("Location added successfully!");
            setFormData({
                name: "",
                description: "",
                address: "",
                category: "",
                buildingName: "",
            });
        } catch (error) {
            alert("Error adding location. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Location Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Building Name"
                value={formData.buildingName}
                onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
                required
            />
            <button type="submit">Add Location</button>
        </form>
    );
};

export default AddLocationForm;
