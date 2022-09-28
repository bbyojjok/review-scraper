import axios from 'axios';

const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL = 'http://localhost:8083';

export default client;
