import Dotenv from 'dotenv';
Dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import schedule from 'node-schedule';
import helmet from 'helmet';
import compression from 'compression';
import route from './api/index.js';
import Detail from './models/detail.js';
import Review from './models/review.js';
import { scraping } from './process/scrap.js';
import { getCronRule, getRandom } from './lib/utility.js';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(async () => {
    console.log('[SERVER] Connected to MongoDB');
    await Detail();
    await Review();
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우트 설정
app.use('/api', route);

const port = PORT || 4000;
app.listen(port, async () => {
  console.log(`[SERVER] Express is listening on port ${port}`);

  const rule = [`*/${getRandom(20, 40)}`, '*', '*', '*', '*'].join(' ');
  console.log('rule:', rule);
  schedule.scheduleJob(rule, () => {
    console.log('## 스케쥴 호출');
    scraping();
  });

  /*
  // 스케쥴 등록
  const scrapJob = schedule.scheduleJob(getCronRule(), () => {
    scraping();

    // 스케쥴 취소 후, 3시간 이후 다시 재등록
    setTimeout(() => scrapJob.reschedule(getCronRule()), 1000 * 60 * 60 * 3);
  });
  */
});
