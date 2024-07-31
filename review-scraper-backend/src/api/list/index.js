import express from 'express';
import * as listCtrl from './list.ctrl.js';

const route = express.Router();

route.get('/:name?', listCtrl.list);
route.post('/', listCtrl.write);
route.delete('/:name?', listCtrl.remove);

export default route;
