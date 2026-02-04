export enum VerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface DriverProfileResponse {
  id: number;
  userId: number;
  driverLicenseImage: string;
  carImage: string;
  iban: string;
  verificationStatus: VerificationStatus;
  adminComment: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitDriverProfileRequest {
  driverLicenseImage: string;
  carImage?: string;
  iban: string;
}
