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

export type RegsiterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  success: boolean;
  msg: string;
  user: {
    fullName: string;
    email: string;
    avatar: string;
  };
};

export type OnBoardRequest = {
  fullName?: string;
  bio?: string;
  avatar?: string;
  nativeLang: string;
  learningLang: string;
  location: string;
};

export type OnBoardResponse = {
  success: boolean;
  user: {
    fullName: string;
    email: string;
    bio: string;
    nativeLang: string;
    learningLang: string;
    location: string;
    friends: Array<string>;
  };
};

export type AuthUserResponse = {
  success: boolean;
  user: {
    _id: string;
    avatar: string;
    bio: string;
    email: string;
    friends: Array<string>;
    fullName: string;
    isOnboarded: boolean;
    learningLang: string;
    location: string;
    nativeLang: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type LogoutResponse = {
  success: boolean;
  msg: string;
};
