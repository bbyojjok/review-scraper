import Dotenv from 'dotenv';
Dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('get request !!~');
});

import store from 'app-store-scraper';
import gplay from 'google-play-scraper';

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`[SERVER] Express is listening on port ${port}`);

  /**
   *
   * ## 스키마정의
   *
   * 1.앱 리스트
   * 앱 이름
   * 구글플레이 앱아이디
   * 앱스토어 앱아이디
   * 이미지
   *
   *
   * 2 앱 상세내용
   * 이름: 앱 이름
   * android: 안드로이드 앱아이디
   * ios: 애플 앱아이디
   * created: 생성일
   * 앱 버젼
   * 평점
   * 스토어링크
   * 생성일
   * 업데이트일
   *
   *
   * 3. 앱 리뷰
   * 앱 이름
   * 운영체제
   * 날짜
   * 작성자
   * 타이틀
   * 코멘트
   * 평점
   * 유저이미지
   * 답변날짜
   * 답변내용
   * 생성일
   * 업데이트일
   *
   *
   *
   * 리뷰 {
   *  ios: 날짜, 작성자, 코멘트, 평점, 타이틀,
   *  android: 날짜, 유저명, 텍스트, 평점, 유저이미지url, 답변날짜, 답변내용
   * }
   */

  const hmallStoreId = 870397981;
  const hmallGplayId = 'com.hmallapp';
  // store
  //   .app({ id: hmallStoreId, country: 'kr' })
  //   .then(console.log)
  //   .catch(console.log);

  // store
  //   .reviews({
  //     appId: 'com.hyundaihmall.app',
  //     sort: store.sort.RECENT,
  //     page: 1,
  //   })
  //   .then(console.log)
  //   .catch(console.log);

  // gplay
  //   .reviews({
  //     appId: hmallGplayId,
  //     lang: 'ko',
  //     sort: gplay.sort.NEWEST,
  //     num: 1000,
  //   })
  //   .then(console.log, console.log);

  gplay
    .reviews({
      appId: 'com.mojang.minecraftpe',
      sort: gplay.sort.RATING,
      num: 3000,
    })
    .then(console.log, console.log);
});
