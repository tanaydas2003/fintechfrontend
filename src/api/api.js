import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchTransactions = async (params) => {
  const response = await axios.get(`${API_URL}/transactions`, { params });
  return response.data;
};

export const fetchSummary = async () => {
  const response = await axios.get(`${API_URL}/summary`);
  return response.data;
};

export const fetchRecentTransactions = async () => {
  const response = await axios.get(`${API_URL}/recent-transactions`);
  return response.data;
};
