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

export const getAboutMe = async () => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      throw new Error('User not authenticated');
    }

    // Assuming there is an endpoint to get user information
    const response = await api.post('/users/me', { token });

    return response.data.data; 
  } catch (error) {
    console.error('Get about me failed:', error);
    throw error;
  }
};

