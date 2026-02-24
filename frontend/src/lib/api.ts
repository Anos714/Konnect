import type {
  AuthUserResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  OnBoardRequest,
  OnBoardResponse,
  RegisterResponse,
  RegsiterRequest,
} from "../types";
import { api } from "./axios";

export const userLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const userRegister = async (
  data: RegsiterRequest,
): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const userLogout = async (): Promise<LogoutResponse> => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const userOnBoarding = async (
  data: OnBoardRequest,
): Promise<OnBoardResponse> => {
  const res = await api.post("/auth/onboarding", data);
  return res.data;
};

export const getAuthUser = async (): Promise<AuthUserResponse> => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching user data",
      }
    );
  }
};
