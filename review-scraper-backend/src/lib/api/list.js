import server from './server.js';

export const getList = () => server.get('/api/list');
