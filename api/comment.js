import Request from '@/utils/requests';
export const createComment = (data) => {
  return Request('/comment/create', data);
};
export const getComment = (data) => {
  return Request('/comment/list', data);
};