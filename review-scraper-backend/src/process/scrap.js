import mongoose from 'mongoose';
import gplay from 'google-play-scraper';
import store from 'app-store-scraper';
import moment from 'moment';
import appStoreReview from '../lib/appStoreReview.js';
import { getList } from '../lib/api/index.js';
import { objectKeyAdd, deepCompare } from '../lib/utility.js';
moment.locale('ko');

const nowDate = () => moment().format('YYYY.MM.DD HH:mm:ss');

const scrapingDetailGooglePlay = async (appId) => {
  try {
    const { version, score, url, icon } = await gplay.app({
      appId,
      lang: 'ko',
      country: 'kr',
    });
    return { version, score, url, icon };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingDetailAppStore = async (id) => {
  try {
    const { version, score, url, icon } = await store.app({
      id,
      lang: 'ko',
      country: 'kr',
    });
    return { version, score, url, icon };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingDetail = async (data) => {
  // 스크랩 상세
  const { name, Detail, googlePlayAppId, appStoreId } = data;
  const googlePlay = await scrapingDetailGooglePlay(googlePlayAppId);
  const appStore = await scrapingDetailAppStore(appStoreId);

  const existName = await Detail.findOne({ name }).exec();
  if (existName) {
    try {
      await Detail.findOneAndUpdate(
        { name },
        { $set: { googlePlay, appStore } },
        { new: true },
      ).exec();
    } catch (e) {
      console.error(e);
    }
    return;
  }

  const detail = Detail({ name, googlePlay, appStore });
  try {
    console.log(`[SCRAPING/DETAIL] #${name} detail, new`);
    await detail.save();
  } catch (e) {
    console.error(e);
  }
};

const scrapingReviewGooglePlay = async (appId) => {
  try {
    const { data } = await gplay.reviews({
      appId,
      lang: 'ko',
      country: 'kr',
      sort: gplay.sort.NEWEST,
      num: 50,
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingReviewAppStore = async (appStoreId) => {
  let reviewAppStore = [];
  for (let i = 1, len = 1; i <= len; i++) {
    reviewAppStore = reviewAppStore.concat(
      await appStoreReview({
        id: appStoreId,
        country: 'kr',
        page: '1',
      }),
    );
  }
  return reviewAppStore;
};

const reviewReducer = async ({ review, data, keyProps, os }) => {
  const { name, Review } = data;

  return await review.reduce(async (acc, cur, idx) => {
    let _acc = await acc;
    const { id, date } = cur;

    const existReview = await Review.findOne({ 'review.id': id }).exec();
    if (existReview) {
      const before = objectKeyAdd(existReview.review, keyProps);
      const after = objectKeyAdd(cur, keyProps);
      const isDeepCompare = !deepCompare(before, after);

      if (isDeepCompare) {
        // 저장된 리뷰 내용 비교후 db 업데이트
        try {
          console.log(
            `[SCRAPING/REVIEW] #${name} review ${os}, updated review idx: ${idx}`,
          );
          await Review.findOneAndUpdate(
            { 'review.id': id },
            { $set: { review: cur, date } },
            { new: true },
          ).exec();
        } catch (e) {
          console.error(e);
        }
      }
      return _acc;
    }

    console.log(
      `[SCRAPING/REVIEW] #${name} review ${os}, new review idx: ${idx}`,
    );
    _acc.push({ name, os, review: cur, date });
    return _acc;
  }, []);
};

const scrapingReview = async (data) => {
  // 스크랩 리뷰
  const { Review, googlePlayAppId, appStoreId } = data;

  // 구글플레이 리뷰
  const reviewGooglePlay = await scrapingReviewGooglePlay(googlePlayAppId);
  const resultReviewGooglePlay = await reviewReducer({
    review: reviewGooglePlay,
    data,
    keyProps: [
      'id',
      'userName',
      'date',
      'score',
      'text',
      'replyDate',
      'replyText',
    ],
    os: 'googlePlay',
  });

  // 앱스토어 리뷰
  const reviewAppStore = await scrapingReviewAppStore(appStoreId);
  const resultReviewAppStore = await reviewReducer({
    review: reviewAppStore,
    data,
    keyProps: ['id', 'author', 'rate', 'title', 'comment', 'date'],
    os: 'appStore',
  });

  // 신규 구글플레이, 앱스토어 리뷰 db 저장
  const resultReview = resultReviewGooglePlay.concat(resultReviewAppStore);
  if (resultReview.length > 0) {
    try {
      await Review.insertMany(resultReview);
    } catch (e) {
      console.error(e);
    }
  }
};

export const scrapingStart = async (data) => {
  // 스크랩 시작
  const { name } = data;
  console.log(`[SCRAPING/BEGIN] #${name} ${nowDate()}`);
  await scrapingDetail(data);
  await scrapingReview(data);
  console.log(`[SCRAPING/FINISH] #${name} ${nowDate()}`);
};

export const scraping = async () => {
  // 스크랩할 리스트 가져오기
  try {
    const { data } = await getList();
    const list = data.reduce((acc, cur) => {
      cur.Detail = mongoose.model(`Detail-${cur.name}`);
      cur.Review = mongoose.model(`Review-${cur.name}`);
      acc.push(cur);
      return acc;
    }, []);

    for (let i = 0, len = list.length; i < len; i++) {
      await scrapingStart(list[i]);
    }
  } catch (e) {
    console.error(e);
  }
};
