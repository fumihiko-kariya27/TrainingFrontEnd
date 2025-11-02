import { postRequest } from '../api/apiClient.js';

/**
 * ログインAPIを呼び出します。
 * @param {string} userid - ユーザーID
 * @param {string} password - パスワード
 * @returns {Promise<Object>} - 認証レスポンス
 */
async function login(userId, password) {
  try {
    const response = await postRequest('/login', {
      userId,
      password,
    });
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export default { login };
