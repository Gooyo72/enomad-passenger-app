import apiClient from './client';
import { MeResponse, ApiResponse, AuthData, LoginRequest } from './types';
import { API_ENDPOINTS } from '@shared/constants/api';

export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthData>> => {
    const response = await apiClient.post<ApiResponse<AuthData>>(API_ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },
  
  register: async (data: any): Promise<any> => {
    const response = await apiClient.post<any>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  forgotPassword: async (phone: string): Promise<void> => {
    const response = await apiClient.post<void>(API_ENDPOINTS.OTP.SEND, { phone, purpose: 'PASSWORD_RESET' });
    return response.data;
  },

  verifyOtp: async (phone: string, code: string): Promise<void> => {
    const response = await apiClient.post<void>(API_ENDPOINTS.OTP.VERIFY, { phone, code });
    return response.data;
  },

  resetPassword: async (data: any): Promise<void> => {
    const response = await apiClient.post<void>('/api/v1/auth/reset-password', data);
    return response.data;
  },

  getMe: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },
};
