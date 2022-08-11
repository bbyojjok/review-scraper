import express from 'express';
import list from './list/index.js';

const route = express.Router();
route.use('/list', list);

export default route;
