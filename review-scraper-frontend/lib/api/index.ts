import client from './client';

export const findList = (name?: string) => {
  let url = '/api/list';
  if (name) {
    url += `/${name}`;
  }
  return client.get(url);
};

export const findReview = (url: string) => client.get(`/api/review/day${url}`);
