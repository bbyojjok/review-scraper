import express from 'express';
import * as listCtrl from './list.ctrl.js';

const route = express.Router();

route.get('/', listCtrl.list);
route.post('/', listCtrl.write);

export default route;
