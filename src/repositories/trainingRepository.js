import { getRequest } from '@/api/apiClient';

const resource = '/training';

export const getHistories = async (userId) => {
  return getRequest(`${resource}/history`, {
    userId: userId,
  });
};
