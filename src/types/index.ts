export type AuthType = {
  userId: string;
  token: string;
};

export type UserCreateRes = {
  id: string;
  email: string;
  password: string;
};

export type SignIn = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};
