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

  const getUserById = async (id: string, token: string) => {
    const res = await request(`${base}users/${id}`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const updateUser = async (id: string, email: string, password: string, token: string) => {
    await request(`${base}users/${id}`, 'PUT', JSON.stringify({ email, password }), {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    }); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const deleteUser = async (id: string, token: string) => {
    await request(`${base}users/${id}`, 'DELETE', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
  };

  const getNewUserToken = async (id: string, token: string) => {
    const res = await request(`${base}users/${id}/tokens`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const getAllUserWords = async (id: string, token: string) => {
    const res = request(`${base}users/${id}/words`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const createUserWord = async (id: string, wordId: string, difficulty: string, token: string, optional = {}) => {
    const newUserWord = {
      difficulty,
      optional,
    };
    await request(`${base}users/${id}/words/${wordId}`, 'POST', JSON.stringify(newUserWord), {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
  };

  const getUserWordById = async (id: string, wordId: string, token: string) => {
    const res = await request(`${base}users/${id}/words/${wordId}`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const updateUserWord = async (id: string, wordId: string, difficulty: string, token: string, optional = {}) => {
    await request(`${base}users/${id}/words/${wordId}`, 'PUT', JSON.stringify({ difficulty, optional }), {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    }); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const deleteUserWord = async (id: string, wordId: string, token: string) => {
    await request(`${base}users/${id}/words/${wordId}`, 'DELETE', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
  };

  const getUserAggregatedWords = async (id: string, token: string) => {
    const res = await request(`${base}users/${id}/aggregatedWords`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const getUserAggregatedWordById = async (id: string, wordId: string, token: string) => {
    const res = await request(`${base}users/${id}/aggregatedWords/${wordId}`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const getUserStatistic = async (id: string, token: string) => {
    const res = await request(`${base}users/${id}/statistics`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const updateUserStatistic = async (id: string, learnedWord: string, token: string, optional = {}) => {
    await request(`${base}users/${id}/statistics`, 'PUT', JSON.stringify({ learnedWord: learnedWord, optional }), {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    }); // Поменять логику запроса, когда дело дойдет до реализации функционала
  };

  const getUserSettings = async (id: string, token: string) => {
    const res = await request(`${base}users/${id}/settings`, 'GET', null, {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    });
    return res;
  };

  const updateUserSettings = async (id: string, wordsPerDay: string, token: string, optional = {}) => {
    await request(`${base}users/${id}/settings`, 'PUT', JSON.stringify({ wordsPerDay, optional }), {
      'Content-type': 'application/json',
      Authorization: `Berear ${token}`,
    }); // Поменять логику запроса, когда дело дойдет до реализации функционала
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
