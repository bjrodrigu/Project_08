import React, { useState } from "react";
import { addTask } from "../../utils/api";

const AddTaskForm = () => {
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTask(formData);
            alert("Task added successfully!");
            setFormData({ name: "", description: "" });
        } catch (error) {
            alert("Error adding task. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Name"
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
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;
