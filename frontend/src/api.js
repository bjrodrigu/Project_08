// Single place for the backend URL. Set REACT_APP_API_URL (see .env.example)
// to point the frontend at a different backend.
export const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";
