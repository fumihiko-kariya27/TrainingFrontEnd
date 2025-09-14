import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * GETリクエストを送信する
 *
 * @param {string} url
 * @param {object} params
 * @returns {Promise<any>} APIからのレスポンスデータ
 */
export const getRequest = async (url, params) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Get request error:', error);
    throw error;
  }
};

/**
 * POSTリクエストを送信する
 *
 * @param {*} url
 * @param {*} data
 * @returns {Promise<any>} APIからのレスポンスデータ
 */
export const postRequest = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Post request error:', error);
    throw error;
  }
};
