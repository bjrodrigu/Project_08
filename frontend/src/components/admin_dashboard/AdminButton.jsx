import React, { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

export default function AdminButton() {
    const { user } = useContext(LoginContext);
    const navigate = useNavigate(); // Hook moved to the top

    const isAdmin = user?.isAdmin || JSON.parse(localStorage.getItem("isAdmin"));

    if (!isAdmin) {
        return null; // Early return after hook is called
    }

    return (
        <button
            style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            onClick={() => navigate("/admin-dashboard")}
        >
            Admin Dashboard
        </button>
    );
}
