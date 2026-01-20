import { publicApi, privateApi } from '@/lib/api-client';
import axios from 'axios';

// --- Types ---

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface RegisterPayload {
  name: string;
  businessType: string;
  businessName: string;
  email: string;
  password: string;
  businessAddress: string;
  contact: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyEmailPayload {
  email: string;
  oneTimeCode: number; // User input showed integer
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// --- Service Functions ---

export const authService = {
  // Create User
  register: async (payload: RegisterPayload) => {
    const response = await publicApi.post<ApiResponse>('/user', payload);
    return response.data;
  },

  // User Login
  login: async (payload: LoginPayload) => {
    const response = await publicApi.post<ApiResponse>('/auth/login', payload);
    return response.data;
  },

  // Admin Login
  // Note: User specified http://localhost:5001/ for admin login, which might be outside the /api/v1 base URL.
  adminLogin: async (payload: LoginPayload) => {
    // We create a temporary instance or use axios directly if it's a completely different base URL
    // Assuming it's on the same host but different path, or explicitly http://localhost:5001/
    const response = await axios.post<ApiResponse>('http://localhost:5001/', payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  // Forget Password
  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const response = await publicApi.post<ApiResponse>('/auth/forget-password', payload);
    return response.data;
  },

  // Verify Email (OTP)
  verifyEmail: async (payload: VerifyEmailPayload) => {
    const response = await publicApi.post<ApiResponse>('/auth/verify-email', payload);
    return response.data;
  },

  // Reset Password
  // User mentioned "Authorization = ...", implying a token is needed (likely from verify-email response)
  resetPassword: async (payload: ResetPasswordPayload, token: string) => {
    const response = await publicApi.post<ApiResponse>('/auth/reset-password', payload, {
      headers: {
        Authorization: `Bearer ${token}` // Assuming Bearer format
      }
    });
    return response.data;
  },

  // Change Password
  changePassword: async (payload: ChangePasswordPayload) => {
    const response = await privateApi.post<ApiResponse>('/auth/change-password', payload);
    return response.data;
  },

  // Get User Profile
  getProfile: async () => {
    const response = await privateApi.get<ApiResponse>('/user/profile');
    return response.data;
  },
};
