import Dotenv from 'dotenv';
Dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import route from './api/index.js';

import Detail from './models/detail.js';
import Review from './models/review.js';
import { scraping } from './process/scrap.js';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(async () => {
    // console.log('Connected to MongoDB');
    await Detail();
    await Review();
    // scraping();
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우트 설정
app.use('/api', route);

const port = PORT || 4000;
app.listen(port, async () => {
  console.log(`[SERVER] Express is listening on port ${port}`);
  // try {
  //   await Detail();
  //   await Review();
  //   scraping();
  // } catch (e) {
  //   console.log(`[SERVER] Error: ${e}`);
  // }
});
