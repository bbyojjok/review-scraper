import client from './client';

export const findList = (name?: string) => {
  let url = '/api/list';
  if (name) {
    url += `/${name}`;
  }
  return client.get(url);
};

export const findReview = (url: string) => client.get(`/api/review/day${url}`);

export const getLists = async (name?: string) => {
  let url = '/api/list';
  if (name) {
    url += `/${name}`;
  }
  const { data } = await client.get(url);
  return data;
};

export const getReview = async (url: string) => {
  const { data, headers } = await client.get(`/api/review/day${url}`);
  return {
    data,
    totalCount: headers['total-count'],
  };
};
