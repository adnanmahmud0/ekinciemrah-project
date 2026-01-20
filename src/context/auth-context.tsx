"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, LoginPayload, RegisterPayload, ApiResponse } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { publicApi, privateApi } from "@/lib/api-client";

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string; // admin or user
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload, isAdmin?: boolean) => Promise<ApiResponse>;
  register: (payload: RegisterPayload) => Promise<ApiResponse>;
  logout: () => void;
  // Exposing api clients via context as requested
  publicApi: typeof publicApi;
  privateApi: typeof privateApi;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authService.getProfile();
          if (response.success && response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (payload: LoginPayload, isAdmin = false) => {
    try {
      setIsLoading(true);
      const response = isAdmin 
        ? await authService.adminLogin(payload) 
        : await authService.login(payload);

      if (response.success && response.data) {
        // Assuming response.data contains the token or user + token
        // The user example output for login was just "data": "..." which might be the token string
        // or an object with token. Let's handle both.
        
        let token = "";
        let userData = null;

        if (typeof response.data === 'string') {
          token = response.data;
        } else if (typeof response.data === 'object') {
            // @ts-ignore
            token = response.data.token || response.data.accessToken;
            // @ts-ignore
            userData = response.data.user;
        }

        if (token) {
          localStorage.setItem("token", token);
          
          // If we didn't get user data in login response, fetch it
          if (!userData) {
             const profileResponse = await authService.getProfile();
             if (profileResponse.success) {
               userData = profileResponse.data;
             }
          }
          
          setUser(userData);
          return response;
        } else {
             // If data is just the token string as per user example "data": "..."
             // wait, user said `output- { "success": true, ..., "data": "..." }`
             // If data IS the token.
             if (typeof response.data === 'string') {
                 localStorage.setItem("token", response.data);
                  const profileResponse = await authService.getProfile();
                  if (profileResponse.success) {
                    setUser(profileResponse.data);
                  }
                  return response;
             }
        }
      }
      return response;
    } catch (error: any) {
        // Re-throw or return error format
        throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      setIsLoading(true);
      const response = await authService.register(payload);
      return response;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        publicApi,
        privateApi
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
