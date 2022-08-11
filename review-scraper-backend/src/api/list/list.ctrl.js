import Joi from 'joi';
import gplay from 'google-play-scraper';
import store from 'app-store-scraper';
import List from '../../models/list.js';

const validtationGooglePlayId = async (appId) => {
  try {
    return await gplay.app({ appId, lang: 'ko', country: 'kr' });
  } catch (e) {
    return false;
  }
};

const validtationAppStoreId = async (id) => {
  try {
    return await store.app({ id, lang: 'ko', country: 'kr' });
  } catch (e) {
    return false;
  }
};

const validtationAppId = async ({ googlePlayAppId, appStoreId }) => {
  const a = await validtationGooglePlayId(googlePlayAppId);
  const b = await validtationAppStoreId(appStoreId);
};

/* 리스트 작성
POST /api/list
{
  "name": "thehyundai",
  "googlePlayAppId": "com.hdmallapp.thehyundai",
  "appStoreId": 1067693191
}
*/
export const write = async (req, res) => {
  // validation
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    googlePlayAppId: Joi.string().required(),
    appStoreId: Joi.number().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }

  const { name, googlePlayAppId, appStoreId } = req.body;

  // db에 같은 name이 존재하는지 체크
  const existList = await List.findOne({ name }).exec();
  console.log('# existList:', existList);
  if (existList) {
    return res.json(existList);
  }

  // googlePlayAppId, appStoreId 유효한지 체크
  const validAppId = await validtationAppId({ googlePlayAppId, appStoreId });
  console.log('# validAppId:', validAppId);

  // list 저장
  const list = new List({ name, googlePlayAppId, appStoreId });
  try {
    await list.save();
    res.json(list);
  } catch (e) {
    res.status(500).json(e);
  }

  // TODO db 저장후 스키마 모델 생성

  // TODO 스크랩 시작

  res.send('test !!');
};

/* 리스트 조회
GET /api/list
*/
export const list = (req, res) => {
  res.send('test !!');
};
