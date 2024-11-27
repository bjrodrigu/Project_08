import React, { useState } from "react";
import { addLocationTask } from "../../utils/api";

const AddLocationTaskForm = () => {
    const [formData, setFormData] = useState({ taskName: "", locationName: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addLocationTask(formData);
            alert("Location Task added successfully!");
            setFormData({ taskName: "", locationName: "" });
        } catch (error) {
            alert("Error adding location task. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Name"
                value={formData.taskName}
                onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Location Name"
                value={formData.locationName}
                onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                required
            />
            <button type="submit">Add Location Task</button>
        </form>
    );
};

export default AddLocationTaskForm;
