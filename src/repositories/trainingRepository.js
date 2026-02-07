import { getRequest, postRequest } from '@/api/apiClient';

const resource = '/training';

export const getHistories = async (userId) => {
  return getRequest(`${resource}/history`, {
    userId: userId,
  });
};

export const getTraining = async () => {
  return getRequest(`${resource}`);
};

export const save = async (training) => {
  return postRequest(`${resource}/create`, training);
}

export const deleteTraining = async (trainingId) => {
  return postRequest(`${resource}/delete`, {
    trainingId: trainingId,
  });
}

export const updateTraining = async (training) => {
  return postRequest(`${resource}/update`, training);
}