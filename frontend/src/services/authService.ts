import axios from "axios";

const API_BASE_URL = "https://fine-cub-mutually.ngrok-free.app"; // Replace with your API base URL

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
    console.log("Login response:", response); // Log the response data
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Handle API errors
      throw new Error(error.response.data.message || "Login failed");
    } else {
      // Handle network or other errors
      throw new Error("An unexpected error occurred");
    }
  }
};
