import { getRequest } from '@/api/apiClient';

const resource = '/training/user';

export default {
  /**
   * ユーザー一覧を取得します。
   * @returns {Promise<any>} APIからのレスポンス
   */
  async get() {
    return getRequest(resource);
  },
};
