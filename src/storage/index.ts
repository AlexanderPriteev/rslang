import { User } from '../types/User';

const storage = window.localStorage;

export function getStore(): User | undefined {
  const userStr = storage.getItem('user');
  if (userStr) return JSON.parse(userStr) as User;
}

export function setStore(user: User) {
  storage.setItem('user', JSON.stringify(user));
}

export function removeStore(user: User) {
  storage.removeItem('user');
}
