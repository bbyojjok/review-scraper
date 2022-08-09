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

/**
 *
 * ## 스키마정의
 *
 * 1.앱 리스트 list.js
 * 앱 이름
 * 구글플레이 앱아이디
 * 앱스토어 앱아이디
 * 이미지
 * 생성일
 * 수정일
 *
 *
 * 2 앱 상세내용 detail.js
 * 이름: 앱 이름
 * android: 안드로이드 앱아이디
 * ios: 애플 앱아이디
 * created: 생성일
 * 업데이트일
 * 앱 버젼
 * 평점
 * 스토어링크
 *
 *
 * 3. 앱 리뷰 review.js
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

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`[SERVER] Express is listening on port ${port}`);
});
