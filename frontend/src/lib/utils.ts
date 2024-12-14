import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { api } from "./instance";
import { toast } from "./toast";
import Swal from "sweetalert2";
import { NavigateFunction } from "react-router-dom";
import { fetchFCMToken } from "@/firebase/firebase";

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
export async function login(
  value: LoginProps,
  navigate: NavigateFunction
  // @ts-ignore
): Promise<LoginResponse | null> {
  try {
    let fcmToken;
    // Make the API call to login
    try {
      fcmToken = await fetchFCMToken();
    } catch (error) {
      console.log("failed to get fcm token");
    }
    // @ts-ignore
    value.pushToken = fcmToken;
    const response = await api.post<LoginResponse>("/api/auth/login", value);

    // Extract the token and message from the response
    const { token, user } = response.data.data;

    // Store the token in localStorage or cookies for future use
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
    // return { token, data };
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
  value: RegisterProps,
  navigate: any
): Promise<RegisterResponse | null> {
  try {
    // Make the API call to register
    const response = await api.post<RegisterResponse>(
      "/api/auth/register", // Replace with your actual API endpoint
      value
    );

    Swal.fire({
      icon: "success",
      title: "Registered Successfully",
      text: "Redirecting to login page...",
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      didClose: () => {
        navigate("/login");
      },
    });

    // Extract the message and optional userId from the response
    const { message, userId } = response.data;

    return { message, userId };
  } catch (error) {
    // Handle error from the API
    if (axios.isAxiosError(error) && error.response) {
      toast.error("Registration failed: " + error.response.data);
    } else {
      console.error("An unexpected error occurred:", error);
      toast.error("Failed to register");
    }

    return null;
  }
}
