import apiClient from './client';
import { MeResponse, ApiResponse, AuthData, LoginRequest } from './types';

export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthData>> => {
    const response = await apiClient.post<ApiResponse<AuthData>>('/v1/users/login', data);
    return response.data;
  },
  
  register: async (data: any): Promise<any> => {
    const response = await apiClient.post<any>('/v1/users', data);
    return response.data;
  },

  forgotPassword: async (phone: string): Promise<void> => {
    const response = await apiClient.post<void>('/auth/forgot-password', { phone });
    return response.data;
  },

  verifyOtp: async (phone: string, code: string): Promise<void> => {
    const response = await apiClient.post<void>('/auth/verify-otp', { phone, code });
    return response.data;
  },

  resetPassword: async (data: any): Promise<void> => {
    const response = await apiClient.post<void>('/auth/reset-password', data);
    return response.data;
  },

  getMe: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>('/v1/users/me');
    return response.data;
  },
};
