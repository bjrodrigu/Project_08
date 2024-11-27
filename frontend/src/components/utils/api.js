import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addBuilding = (data) => axios.post(`${API_BASE_URL}/building/addBuilding`, data);
export const addLocation = (data) => axios.post(`${API_BASE_URL}/location/addLocation`, data);
export const addTask = (data) => axios.post(`${API_BASE_URL}/task/addTask`, data);
export const addLocationTask = (data) => axios.post(`${API_BASE_URL}/locationTask/addLocationTask`, data);
export const addImage = (data) => axios.post(`${API_BASE_URL}/image/addImage`, data);
