import Request from '@/utils/requests';

export const login = (data) => {
  return Request('/login', data);
};