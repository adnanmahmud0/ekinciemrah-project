/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  authService,
  LoginPayload,
  RegisterPayload,
  ApiResponse,
} from "@/services/auth.service";
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
          const role = localStorage.getItem("role");
          const response =
            role === "admin"
              ? await authService.getAdminProfile()
              : await authService.getProfile();

          if (response.success && response.data) {
            setUser(response.data);
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
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

      // Assuming response.data contains the token or user + token
      // The user example output for login was just "data": "..." which might be the token string
      // or an object with token. Let's handle both.

      if (response.success && response.data) {
        let token = "";
        let userData: any = null;

        if (typeof response.data === "string") {
          token = response.data;
        } else if (typeof response.data === "object" && response.data) {
          token = response.data.token || response.data.accessToken || "";
          userData = response.data.user;
        }

        if (token && token !== "undefined" && token !== "null") {
          localStorage.setItem("token", token);
        }

        if (!userData) {
          const profileResponse = isAdmin
            ? await authService.getAdminProfile()
            : await authService.getProfile();

          if (profileResponse.success) {
            userData = profileResponse.data;
          }
        }

        let isActuallyAdmin = false;
        if (userData && typeof userData === "object") {
          const rawRole =
            (userData as any).role ||
            (userData as any).userRole ||
            (userData as any).type;

          if (rawRole) {
            const normalized = String(rawRole).toLowerCase();
            isActuallyAdmin = normalized.includes("admin");
            const storedRole = isActuallyAdmin ? "admin" : "user";
            localStorage.setItem("role", storedRole);
          } else {
            isActuallyAdmin = isAdmin;
            localStorage.setItem("role", isAdmin ? "admin" : "user");
          }
        } else {
          isActuallyAdmin = isAdmin;
          localStorage.setItem("role", isAdmin ? "admin" : "user");
        }

        // Only set user state and stop loading if it's not an admin login to prevent re-render flash
        // The hard redirect will handle setting the user state on the next page load
        if (!isActuallyAdmin) {
          setUser(userData);
          setIsLoading(false);
        }
        return response;
      } else {
        return response;
      }
    } catch (error: any) {
      setIsLoading(false);
      throw error;
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
    localStorage.removeItem("role");
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
        privateApi,
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
