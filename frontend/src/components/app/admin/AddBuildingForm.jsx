import React, { useState } from "react";
import { addBuilding } from "../../utils/api";

const AddBuildingForm = () => {
    const [formData, setFormData] = useState({ name: "", longitude: "", latitude: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBuilding(formData);
            alert("Building added successfully!");
        } catch (error) {
            alert("Error adding building.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Building Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            />
            <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            />
            <button type="submit">Add Building</button>
        </form>
    );
};

export default AddBuildingForm;
