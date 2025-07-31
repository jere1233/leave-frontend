import axios from 'axios';

const LOGIN_URL = 'http://127.0.0.1:8000/api/users/login/';

export const loginService = async (credentials) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Login failed' };
  }
};
