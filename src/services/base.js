import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const get = async (url, token) => {
  try {
    const res = await axios.get(`${API_BASE}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    console.log('GET', url, res.data);
    return res.data;
  } catch (err) {
    console.error('GET', url, err.response?.data || err.message);
    throw err;
  }
};

export const post = async (url, data, token) => {
  try {
    const res = await axios.post(`${API_BASE}${url}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    console.log('POST', url, data, res.data);
    return res.data;
  } catch (err) {
    console.error('POST', url, data, err.response?.data || err.message);
    throw err;
  }
};

export const patch = async (url, data, token) => {
  try {
    const res = await axios.patch(`${API_BASE}${url}`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    console.log('PATCH', url, data, res.data);
    return res.data;
  } catch (err) {
    console.error('PATCH', url, data, err.response?.data || err.message);
    throw err;
  }
};

export const del = async (url, token) => {
  try {
    const res = await axios.delete(`${API_BASE}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    console.log('DELETE', url, res.data);
    return res.data;
  } catch (err) {
    console.error('DELETE', url, err.response?.data || err.message);
    throw err;
  }
};
