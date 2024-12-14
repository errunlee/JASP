import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { api } from "./instance";
import { toast } from "./toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type LoginProps = {
  email: string;
  password: string;
};

// Define the login response type
interface LoginResponse {
  token: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      role: string[];
    };
  };
}

// Define the function to handle user login
export async function login(value: LoginProps): Promise<LoginResponse | null> {
  try {
    // Make the API call to login
    const response = await api.post<LoginResponse>("/api/auth/login", value);

    // Extract the token and message from the response
    const { token, data } = response.data;

    // Store the token in localStorage or cookies for future use
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { token, data };
  } catch (error) {
    toast.error("Login failed!");
    // Handle error from the API
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login failed:", error.response.data);
    } else {
      console.error("An unexpected error occurred:", error);
    }

    return null;
  }
}

// Define the register response type
interface RegisterResponse {
  message: string;
  userId?: string; // Optional, depending on API response
}
export type RegisterProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Define the function to handle user registration
export async function register(
  value: RegisterProps
): Promise<RegisterResponse | null> {
  try {
    // Make the API call to register
    const response = await api.post<RegisterResponse>(
      "/api/auth/register", // Replace with your actual API endpoint
      value
    );

    // Extract the message and optional userId from the response
    const { message, userId } = response.data;

    return { message, userId };
  } catch (error) {
    // Handle error from the API
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration failed:", error.response.data);
    } else {
      console.error("An unexpected error occurred:", error);
    }

    return null;
  }
}
