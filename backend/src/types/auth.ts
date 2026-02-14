export interface registerRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface registerResponse {
  success: boolean;
  msg: string | undefined;
  user?: object;
}

export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse {
  success: boolean;
  msg: string | undefined;
  user?: object;
}
