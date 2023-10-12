import axios from 'axios';

const API_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;
console.log(
  'process.env.NEXT_PUBLIC_API_BASEURL:',
  process.env.NEXT_PUBLIC_API_BASEURL,
);
const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? API_BASEURL : 'http://localhost:8083';

export default client;
