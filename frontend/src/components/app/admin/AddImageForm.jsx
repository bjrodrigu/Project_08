import React, { useState } from "react";
import { addImage } from "../../utils/api";

const AddImageForm = () => {
    const [formData, setFormData] = useState({ imageUrl: "", locationName: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addImage(formData);
            alert("Image added successfully!");
            setFormData({ imageUrl: "", locationName: "" });
        } catch (error) {
            alert("Error adding image. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="url"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Location Name"
                value={formData.locationName}
                onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                required
            />
            <button type="submit">Add Image</button>
        </form>
    );
};

export default AddImageForm;
