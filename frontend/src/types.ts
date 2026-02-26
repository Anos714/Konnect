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

export type FriendsResponse = {
  success: boolean;
  user: {
    _id: string;
    friends: Array<{
      _id: string;
      fullName: string;
      email: string;
      avatar: string;
      bio: string;
      nativeLang: string;
      learningLang: string;
      location: string;
      isOnboarded: boolean;
      friends: string[];
      createdAt: string;
      updatedAt: string;
    }>;
  };
};

export type RecommendedUsersResponse = {
  success: boolean;
  user: Array<{
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    bio: string;
    nativeLang: string;
    learningLang: string;
    location: string;
  }>;
};

export type OutgoingRequestsResponse = {
  success: boolean;
  outgoingReqs: Array<{
    _id: string;
    sender: string;
    receiver: {
      _id: string;
      fullName: string;
      avatar: string;
      nativeLang: string;
      learningLang: string;
    };
    status: "pending" | "accepted";
    createdAt: string;
    updatedAt: string;
  }>;
};

export type sendFriendReqsResponse = {
  success: true;
  request: {
    sender: string;
    receiver: string;
    status: "pending" | "accepted";
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type FriendType = {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  nativeLang: string;
  learningLang: string;
  location: string;
};

export type FriendReqNotificationType = {
  success: boolean;
  incomingReqs: Array<{
    _id: string;
    sender: {
      _id: string;
      fullName: string;
      avatar: string;
      nativeLang: string;
      learningLang: string;
    };
    receiver: string;
    status: "pending"|"accepted";
    createdAt: string;
    updatedAt: string;
    
  }>;
  acceptedReqs: Array<{
    _id: string;
    sender: string;
    receiver: {
      _id: string;
      fullName: string;
      avatar: string;
      nativeLang: string;
      learningLang: string;
    };
    status: "pending" | "accepted";
    createdAt: string;
    updatedAt: string;
  }>;
};

export type AcceptFriendReqResponse = {
  success: boolean;
  msg: string;
};

export type ChatResponse={
  success:boolean;
  token:string;
}