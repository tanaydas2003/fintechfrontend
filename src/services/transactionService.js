import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api/transactions';

export const fetchTransactions = async (page, limit) => {
  const token = Cookies.get('token'); 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, config);
  return response.data;
};
