import api from './api';
import { saveTokenToLocalStorage, removeTokenFromLocalStorage, getTokenFromLocalStorage } from '../utils/authUtils';

export const login = async (phone: string, password: string) => {
  try {
    const response = await api.post('/users/login', { phone, password });
    const { token } = response.data.data;
    saveTokenToLocalStorage(token);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  removeTokenFromLocalStorage();
};

export const isAuthenticated = () => {
  const token = getTokenFromLocalStorage();
  return !!token;
};
