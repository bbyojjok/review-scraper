import express from 'express';
import list from './list/index.js';
import detail from './detail/index.js';

const route = express.Router();

route.use('/list', list);
route.use('/detail', detail);

export default route;
