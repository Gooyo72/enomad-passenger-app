export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  phoneVerified?: boolean;
  status?: string;
}

export interface MeResponse {
  user: UserResponse;
  roles: string[];
}

export interface LoginRequest {
  phone: string;
  password?: string;
}

export interface AuthData {
  user: UserResponse;
  auth: {
    accessToken: string;
    refreshToken: string;
  };
}
