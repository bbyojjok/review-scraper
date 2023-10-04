import axios from 'axios';

const client = axios.create();
client.defaults.withCredentials = true;
client.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? // ? // ? 'https://review.stlee.kr'
      'https://port-0-review-scraper-iciy2almznf244.sel5.cloudtype.app'
    : 'http://localhost:8083';
//: 'https://port-0-review-scraper-iciy2almznf244.sel5.cloudtype.app';

export default client;
