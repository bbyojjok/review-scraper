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

  /*
  try {
    const { data } = await client.post('/api/list', {
      name,
      appStoreId,
      googlePlayAppId,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
  */
};

export const scrapStart = async () => {
  const { data } = await client.post('/api/review/scrap');
  return data;
};
