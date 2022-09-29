import axios from 'axios';

const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://review.stlee.kr'
    : 'http://localhost:8083';

export default client;
