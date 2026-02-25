import type {
  AcceptFriendReqResponse,
  AuthUserResponse,
  FriendReqNotificationType,
  FriendsResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  OnBoardRequest,
  OnBoardResponse,
  OutgoingRequestsResponse,
  RecommendedUsersResponse,
  RegisterResponse,
  RegsiterRequest,
  sendFriendReqsResponse,
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

export const getUserFriends = async (): Promise<FriendsResponse> => {
  const res = await api.get("/users/friends/");
  return res.data;
};

export const getRecommendedUsers =
  async (): Promise<RecommendedUsersResponse> => {
    const res = await api.get("/users/");
    return res.data;
  };

export const getOutgoingFriendReqs =
  async (): Promise<OutgoingRequestsResponse> => {
    const res = await api.get("/users/outgoing-friend-request");
    return res.data;
  };

export const sendFriendReqs = async (
  userId: string,
): Promise<sendFriendReqsResponse> => {
  const res = await api.post(`/users/friend-request/${userId}`);
  return res.data;
};

export const getFriendReqs = async (): Promise<FriendReqNotificationType> => {
  const res = await api.get("/users/friend-request");
  return res.data;
};

export const acceptFriendReq = async (
  userId: string,
): Promise<AcceptFriendReqResponse> => {
  const res = await api.put(`/users/friend-request/${userId}/accept`);
  return res.data;
};

export const rejectFriendReq = async (
  userId: string,
): Promise<AcceptFriendReqResponse> => {
  const res = await api.post(`/users/friend-request/${userId}/reject`);
  return res.data;
};
