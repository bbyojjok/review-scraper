import axios from 'axios';

const API_URL = process.env.API_URL;
console.log('production' ? API_URL : 'http://localhost:8083');
const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? API_URL : 'http://localhost:8083';

export default client;
