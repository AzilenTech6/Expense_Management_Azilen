import axios from "axios";

const API_BASE_URL = "https://fine-cub-mutually.ngrok-free.app"; // Replace with your API base URL

// Generic GET request
export const get = async (endpoint: string, params?: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Generic POST request
export const post = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Generic PUT request
export const put = async (endpoint: string, data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Generic DELETE request
export const del = async (endpoint: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Error handler
const handleError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data.message || "API request failed");
  } else {
    throw new Error("An unexpected error occurred");
  }
};
