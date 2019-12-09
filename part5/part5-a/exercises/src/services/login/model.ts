export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  name: string;
  token: string;
}
