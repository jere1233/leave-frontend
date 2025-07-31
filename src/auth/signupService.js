import axios from 'axios';

const SIGNUP_URL = 'http://127.0.0.1:8000/api/users/register/';

export const signupService = async (formData) => {
  try {
    const response = await axios.post(SIGNUP_URL, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Signup failed' };
  }
};
