import Joi from 'joi';
import gplay from 'google-play-scraper';
import store from 'app-store-scraper';
import List from '../../models/list.js';
import { createDetail } from '../../models/detail.js';
import { createReview } from '../../models/review.js';
import { scrapingStart } from '../../process/scrap.js';

const validtationGooglePlayId = async (appId) => {
  try {
    return await gplay.app({ appId, lang: 'ko', country: 'kr' });
  } catch (e) {
    return null;
  }
};

const validtationAppStoreId = async (id) => {
  try {
    return await store.app({ id, lang: 'ko', country: 'kr' });
  } catch (e) {
    return null;
  }
};

const validtationAppId = async ({ googlePlayAppId, appStoreId }) => {
  const googelPlay = true; //await validtationGooglePlayId(googlePlayAppId);
  const appStore = await validtationAppStoreId(appStoreId);

  const err = (!googelPlay && 'googelPlay') || (!appStore && 'appStore');
  if (err) {
    return { error: `${err} validation failed` };
  }

  return null;
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
  const { name, googlePlayAppId, appStoreId } = req.body;

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

  // googlePlayAppId, appStoreId 유효한 id값인지 체크
  const validAppId = await validtationAppId({ googlePlayAppId, appStoreId });
  if (validAppId?.error) {
    return res.status(400).json(validAppId);
  }

  // db에 같은 name이 존재하는지 체크
  const existList = await List.findOne({ name }).exec();
  if (existList) {
    return res.json(existList);
  }

  // list 저장
  const list = new List({ name, googlePlayAppId, appStoreId });
  try {
    await list.save();
  } catch (e) {
    return res.status(500).json(e);
  }

  // db 저장후 스키마 모델 생성
  const Detail = await createDetail(name);
  const Review = await createReview(name);

  // 스크랩 시작
  scrapingStart({ name, googlePlayAppId, appStoreId, Detail, Review });

  return res.json(list);
};

/* 리스트 조회
GET /api/list
*/
export const list = async (req, res) => {
  try {
    const queryResult = await List.find({}).exec();
    if (!queryResult) {
      return res.status(404);
    }

    // 우선순위 순서 맞추기
    if (queryResult.length < 4) {
      return res.json(queryResult);
    }
    const fixedName = ['thehyundai', 'tohome', 'hmall'];
    const topArr = new Array(fixedName.length).fill(0);
    const bodyArr = queryResult.reduce((acc, current) => {
      if (fixedName.indexOf(current.name) >= 0) {
        topArr[fixedName.indexOf(current.name)] = current;
      } else {
        acc.push(current);
      }
      return acc;
    }, []);
    const resultData = topArr.concat(bodyArr);

    return res.json(resultData);
  } catch (e) {
    return res.status(500).json(e);
  }
};
