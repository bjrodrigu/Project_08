import React, { useState } from "react";
import AddBuildingForm from "./AddBuildingForm";
import AddLocationForm from "./AddLocationForm";
import AddTaskForm from "./AddTaskForm";
import AddLocationTaskForm from "./AddLocationTaskForm";
import AddImageForm from "./AddImageForm";

const AdminDashboard = () => {
    const [selectedAction, setSelectedAction] = useState("");

    const renderForm = () => {
        switch (selectedAction) {
            case "addBuilding":
                return <AddBuildingForm />;
            case "addLocation":
                return <AddLocationForm />;
            case "addTask":
                return <AddTaskForm />;
            case "addLocationTask":
                return <AddLocationTaskForm />;
            case "addImage":
                return <AddImageForm />;
            default:
                return <p>Please select an action from the dropdown.</p>;
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <select onChange={(e) => setSelectedAction(e.target.value)}>
                <option value="">Select Action</option>
                <option value="addBuilding">Add Building</option>
                <option value="addLocation">Add Location</option>
                <option value="addTask">Add Task</option>
                <option value="addLocationTask">Add Location Task</option>
                <option value="addImage">Add Image</option>
            </select>
            {renderForm()}
        </div>
    );
};

export default AdminDashboard;
