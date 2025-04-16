import axios from "axios";

const API_BASE_URL = "https://fine-cub-mutually.ngrok-free.app"; // Replace with your API base URL

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Generic GET request
export const get = async (endpoint: string, params?: any) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Generic POST request
export const post = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Generic PUT request
export const put = async (endpoint: string, data: any) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Generic DELETE request
export const del = async (endpoint: string) => {
  try {
    const response = await apiClient.delete(endpoint);
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
