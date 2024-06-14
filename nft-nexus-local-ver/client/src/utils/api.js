// client/src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // Adjust based on your server setup
});

export const searchWallet = async (data) => {
  try {
    const response = await api.post('/search-wallet', (data));
    return response.data;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
};