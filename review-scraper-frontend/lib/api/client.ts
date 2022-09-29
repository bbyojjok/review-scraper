import axios from 'axios';

const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://review.stlee.kr'
    : 'http://localhost:8083';

export default client;
