import axios from 'axios';

const API_URL = process.env.API_URL;
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.GENERATE_SOURCEMAP:', process.env.GENERATE_SOURCEMAP);
console.log(
  'process.env.API_URL:',
  'production' ? API_URL : 'http://localhost:8083',
);
const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://reviewback.stlee.kr'
    : 'http://localhost:8083';

export default client;
