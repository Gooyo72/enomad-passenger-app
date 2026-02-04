export interface CarModelResponse {
  id: number;
  make: string;
  model: string;
}

export interface RegisterCarRequest {
  carModelId: number;
  plateNumber: string;
  vinNumber: string;
  seatCount: number;
  cargoCapacity?: number;
  carImage?: string;
}

export interface UpdateCarRequest {
  carModelId: number;
  plateNumber: string;
  vinNumber: string;
  seatCount: number;
  cargoCapacity?: number;
  carImage?: string;
}

export interface CarResponse {
  id: number;
  carModel: CarModelResponse;
  plateNumber: string;
  vinNumber: string;
  seatCount: number;
  cargoCapacity: number | null;
  carImage: string;
}
