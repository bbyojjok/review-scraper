import Dotenv from 'dotenv';
Dotenv.config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import schedule from 'node-schedule';
import route from './api/index.js';
import Review from './models/review.js';
import { scraping } from './process/scrap.js';
import { getCronRule } from './lib/utility.js';

const { PORT, MONGO_URI, COOKIE_SECRET } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: 'review-scraper', useNewUrlParser: true })
  .then(async () => {
    console.log('[SERVER] Connected to MongoDB');
    await Review();
    // scraping();
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();

var whitelist = ['http://localhost:8083', 'https://review.stlee.kr'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10 },
  }),
);
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우트 설정
app.use('/api', route);

const port = PORT || 8082;
app.listen(port, async () => {
  console.log(`[SERVER] Express is listening on port ${port}`);

  // const rule = [`*/${getRandom(2, 10)}`, '*', '*', '*', '*'].join(' ');
  // console.log('rule:', rule);
  // const scrapJob = schedule.scheduleJob(rule, () => {
  //   console.log('## 스케쥴 테스트: 호출!!');

  //   const rule = [`*/${getRandom(2, 10)}`, '*', '*', '*', '*'].join(' ');
  //   console.log('rule:', rule);
  //   scrapJob.reschedule(rule);
  // });

  // const rule = [`*/30`, '*', '*', '*', '*'].join(' ');
  // const scrapJob = schedule.scheduleJob(rule, () => {
  //   console.log('### scraping call !!');
  //   scraping();
  // });

  // 스케쥴 등록
  const scrapJob = schedule.scheduleJob(getCronRule(), () => {
    scraping();

    // 스케쥴 취소 후, 5시간 이후 다시 재등록
    setTimeout(() => scrapJob.reschedule(getCronRule()), 1000 * 60 * 60 * 5);
  });
});
