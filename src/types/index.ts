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

export type SprintResult = {
  wordEn: string;
  wordRu: string;
  wordID: string;
  result: boolean;
  audio: string;
};

export type StatisticGameStore = {
  trueAnswer: [number, number];
  countNewWord: number;
  seriesTrueAnswer: number;
};
