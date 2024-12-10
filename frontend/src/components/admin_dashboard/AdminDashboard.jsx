import React, { useState } from "react";

export default function AdminDashboard() {
    const [form, setForm] = useState({
        imageUrl: "",
        locationName: "",
        taskName: "",
        taskDescription: "",
        buildingName: "",
        longitude: "",
        latitude: "",
        locationDescription: "",
        address: "",
        category: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (endpoint) => {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(form),
            });
            if (response.ok) {
                alert("Action successful!");
            } else {
                alert("Action failed!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <form>
                {/* Add Image */}
                <h3>Add Image</h3>
                <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
                <input name="locationName" placeholder="Location Name" onChange={handleChange} />
                <button type="button" onClick={() => handleSubmit("/image/addImage")}>Add Image</button>

                {/* Add Task */}
                <h3>Add Task</h3>
                <input name="taskName" placeholder="Task Name" onChange={handleChange} />
                <input name="taskDescription" placeholder="Task Description" onChange={handleChange} />
                <button type="button" onClick={() => handleSubmit("/task/addTask")}>Add Task</button>

                {/* Add Building */}
                <h3>Add Building</h3>
                <input name="buildingName" placeholder="Building Name" onChange={handleChange} />
                <input name="longitude" placeholder="Longitude" onChange={handleChange} />
                <input name="latitude" placeholder="Latitude" onChange={handleChange} />
                <button type="button" onClick={() => handleSubmit("/building/addBuilding")}>Add Building</button>

                {/* Add Location */}
                <h3>Add Location</h3>
                <input name="locationName" placeholder="Location Name" onChange={handleChange} />
                <input name="locationDescription" placeholder="Description" onChange={handleChange} />
                <input name="address" placeholder="Address" onChange={handleChange} />
                <input name="category" placeholder="Category" onChange={handleChange} />
                <input name="buildingName" placeholder="Building Name" onChange={handleChange} />
                <button type="button" onClick={() => handleSubmit("/location/addLocation")}>Add Location</button>

                {/* Add Location Task */}
                <h3>Add Location Task</h3>
                <input name="taskName" placeholder="Task Name" onChange={handleChange} />
                <input name="locationName" placeholder="Location Name" onChange={handleChange} />
                <button type="button" onClick={() => handleSubmit("/locationTask/addLocationTask")}>Add Location Task</button>
            </form>
        </div>
    );
}
