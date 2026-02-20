export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  msg: string;
  user: {
    fullName: string;
    email: string;
    avatar: string;
  };
};

export type regsiterRequest = {
  fullName: string;
  email: string;
  password: string;
};
