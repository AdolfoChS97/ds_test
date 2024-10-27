import axios from 'axios';
import type { AuthProvider } from "@refinedev/core";
console.log(import.meta.env);
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const response = await axios.post<{ data: { accessToken: string }, code: number }>('/auth/login', {
      email,
      password,
    });
    if (response.data.code === 0) {
      localStorage.setItem("access_token", response?.data?.data?.accessToken);
      return {
        success: true,
        redirectTo: "/home",
      };
    } else {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },
  register: async ({ username, email, password, role }) => {
    const response = await axios.post<{ data: any, code: number }>('/auth/register', {
      username,
      email,
      password,
      role
    });

    if (response?.data?.code === 0) {
      return {
        success: true,
        redirectTo: "/",
      };
    } else {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "Could not register user",
        },
      }
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
