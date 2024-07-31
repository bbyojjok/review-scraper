import client from './client';

export const findList = (name?: string) => {
  let url = '/api/list';
  if (name) {
    url += `/${name}`;
  }
  return client.get(url);
};

export const findReview = async (url: string) => {
  const { data } = await client.get(`/api/review/day${url}`);
  return {
    data: data.result,
    lastPage: data.lastPage,
  };
};

export const getLists = async (name?: string) => {
  let url = '/api/list';
  if (name) {
    url += `/${name}`;
  }
  const { data } = await client.get(url);
  return data;
};

export const getReview = async (url: string) => {
  const { data } = await client.get(`/api/review/day${url}`);
  return {
    data: data.result,
    totalCount: data.totalCount,
  };
};

export const signin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const { data } = await client.post('/api/auth/login', { username, password });
  return data;
};

export const check = async () => {
  const { data } = await client.get('/api/auth/check');
  return data;
};

export const signout = async () => {
  const { data } = await client.get('/api/auth/logout');
  return data;
};

export const addList = async ({
  name,
  appStoreId,
  googlePlayAppId,
}: {
  name: string;
  appStoreId: number;
  googlePlayAppId: string;
}) => {
  const response = await client.post('/api/list', {
    name,
    appStoreId,
    googlePlayAppId,
  });
  return response;
};

export const deleteList = async (name: string) => {
  const { data } = await client.delete(`/api/list/${name}`);
  return data;
};

export const scrapStart = async () => {
  const { data } = await client.post('/api/review/scrap');
  return data;
};
