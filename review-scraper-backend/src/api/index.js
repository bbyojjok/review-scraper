import express from 'express';
import list from './list/index.js';
import detail from './detail/index.js';
import review from './review/index.js';

const route = express.Router();

route.use('/list', list);
route.use('/detail', detail);
route.use('/review', review);

export default route;
