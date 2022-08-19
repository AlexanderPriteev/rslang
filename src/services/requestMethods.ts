import { User } from '../types/User';
import request from './request';

const requestMethods = () => {
  const base = 'http://localhost:8001/'; // здесь должна быть ссылка на ваш локальный сервер.

  const getWords = async (group = 0, page = 0) => {
    const res = await request(`${base}words?group=${group}&page=${page}`);
    return res;
  };

  const getWordById = async (id: string) => {
    const res = await request(`${base}words/${id}`);
    return res;
  };

  const createUser = async (user: User) => {
    return request(`${base}users`, 'POST', JSON.stringify(user));
  };

  const getUserById = async (id: string) => {
    const res = await request(`${base}users/${id}`);
    return res;
  };

  const updateUser = async (id: string, email: string, password: string) => {
    await request(`${base}users/${id}`, 'PUT', JSON.stringify({ email, password })); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const deleteUser = async (id: string) => {
    await request(`${base}users/${id}`, 'DELETE');
  };

  const getNewUserToken = async (id: string) => {
    const res = await request(`${base}users/${id}/tokens`);
    return res;
  };

  const getAllUserWords = async (id: string) => {
    const res = await request(`${base}users/${id}/words`);
    return res;
  };

  const createUserWord = async (id: string, wordId: string, difficulty: string, optional = {}) => {
    const newUserWord = {
      difficulty,
      optional,
    };
    await request(`${base}users/${id}/words/${wordId}`, 'POST', JSON.stringify(newUserWord)); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const getUserWordById = async (id: string, wordId: string) => {
    const res = await request(`${base}users/${id}/words/${wordId}`);
    return res;
  };

  const updateUserWord = async (id: string, wordId: string, difficulty: string, optional = {}) => {
    await request(`${base}users/${id}/words/${wordId}`, 'PUT', JSON.stringify({ difficulty, optional })); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const deleteUserWord = async (id: string, wordId: string) => {
    await request(`${base}users/${id}/words/${wordId}`, 'DELETE');
  };

  const getUserAggregatedWords = async (id: string) => {
    const res = await request(`${base}users/${id}/aggregatedWords`);
    return res;
  };

  const getUserAggregatedWordById = async (id: string, wordId: string) => {
    const res = await request(`${base}users/${id}/aggregatedWords/${wordId}`);
    return res;
  };

  const getUserStatistic = async (id: string) => {
    const res = await request(`${base}users/${id}/statistics`);
    return res;
  };

  const updateUserStatistic = async (id: string, learnedWord: string, optional = {}) => {
    await request(`${base}users/${id}/statistics`, 'PUT', JSON.stringify({ learnedWord, optional })); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const getUserSettings = async (id: string) => {
    const res = await request(`${base}users/${id}/settings`);
    return res;
  };

  const updateUserSettings = async (id: string, wordsPerDay: string, optional = {}) => {
    await request(`${base}users/${id}/settings`, 'PUT', JSON.stringify({ wordsPerDay, optional })); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const userSignIn = async (email: string, password: string) => {
    return request(`${base}signin`, 'POST', JSON.stringify({ email, password }));
  };

  return {
    getWords,
    getWordById,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getNewUserToken,
    getAllUserWords,
    createUserWord,
    getUserWordById,
    updateUserWord,
    deleteUserWord,
    getUserAggregatedWords,
    getUserAggregatedWordById,
    getUserStatistic,
    updateUserStatistic,
    getUserSettings,
    updateUserSettings,
    userSignIn,
  };
};

export default requestMethods;
