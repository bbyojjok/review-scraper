import mongoose from 'mongoose';
import gplay from 'google-play-scraper';
import store from 'app-store-scraper';
import moment from 'moment';
import appStoreReview from '../lib/appStoreReview.js';
import { dummyList } from '../lib/dummyList.js';
import { objectKeyAdd, deepCompare } from '../lib/utility.js';
moment.locale('ko');

const nowDate = () => moment().format('YYYY.MM.DD HH:mm:ss');

const scrapingDetailGooglePlay = async (appId) => {
  return null;
  // TODO 구글플레이 상세
  // try {
  //   const result = await gplay.app({
  //     appId,
  //     lang: 'ko',
  //     country: 'kr',
  //   });
  //   console.log(result);
  // } catch (e) {
  //   console.error(e);
  //   return null;
  // }
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
  }

  const detail = Detail({ name, googlePlay, appStore });
  try {
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
      num: 10,
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingReview = async (data) => {
  // 스크랩 리뷰
  const { name, Review, googlePlayAppId, appStoreId } = data;

  // 구글플레이 리뷰
  const reviewGooglePlay = await scrapingReviewGooglePlay(googlePlayAppId);
  const resultReviewGooglePlay = await reviewGooglePlay.reduce(
    async (acc, cur, idx) => {
      let _acc = await acc;
      const { id, date } = cur;

      const existReview = await Review.findOne({ 'review.id': id }).exec();
      if (existReview) {
        const props = [
          'id',
          'userName',
          'date',
          'score',
          'text',
          'replyDate',
          'replyText',
        ];
        const before = objectKeyAdd(existReview.review, props);
        const after = objectKeyAdd(cur, props);
        const isDeepCompare = !deepCompare(before, after);

        if (isDeepCompare) {
          // 저장된 리뷰 내용 비교후 db 업데이트
          try {
            await Review.findOneAndUpdate(
              { 'review.id': id },
              { $set: { review: cur, date } },
              { new: true },
            ).exec();
            console.log(
              `[SCRAPING] #${name} reviews googlePlay, updated review idx: ${idx}`,
            );
          } catch (e) {
            console.error(e);
          }
        }
        return _acc;
      }

      console.log(
        `[SCRAPING] #${name} reviews googlePlay, new review idx: ${idx}`,
      );
      _acc.push({ name, os: 'googlePlay', review: cur, date });
      return _acc;
    },
    [],
  );

  // 신규 구글플레이 리뷰 db 저장
  if (resultReviewGooglePlay.length > 0) {
    try {
      await Review.insertMany(resultReviewGooglePlay);
    } catch (e) {
      console.error(e);
    }
  }

  // 앱스토어 리뷰
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
  const resultReviewAppStore = await reviewAppStore.reduce(
    async (acc, cur, idx) => {
      let _acc = await acc;
      const { id, updated } = cur;

      const existReview = await Review.findOne({ 'review.id': id }).exec();
      if (existReview) {
        const props = ['id', 'author', 'rate', 'title', 'comment', 'updated'];
        const before = objectKeyAdd(existReview.review, props);
        const after = objectKeyAdd(cur, props);
        const isDeepCompare = !deepCompare(before, after);

        if (isDeepCompare) {
          console.log(before);
          console.log(after);

          // 저장된 리뷰 내용 비교후 db 업데이트
          try {
            await Review.findOneAndUpdate(
              { 'review.id': id },
              { $set: { review: cur, date: updated } },
              { new: true },
            ).exec();
            console.log(
              `[SCRAPING] #${name} reviews appStore, updated review idx: ${idx}`,
            );
          } catch (e) {
            console.error(e);
          }
        }

        return _acc;
      }

      console.log(
        `[SCRAPING] #${name} reviews appStore, new review idx: ${idx}`,
      );
      _acc.push({ name, os: 'appStore', review: cur, date: updated });
      return _acc;
    },
    [],
  );

  // 신규 구글플레이 리뷰 db 저장
  if (resultReviewAppStore.length > 0) {
    try {
      await Review.insertMany(resultReviewAppStore);
    } catch (e) {
      console.error(e);
    }
  }
};

const scrapingStart = async (data) => {
  // 스크랩 시작
  const { name } = data;
  console.log(`
--------------------------------------------
  [SCRAPING/START] #${name}
  ${nowDate()}
--------------------------------------------
  `);

  await scrapingDetail(data);
  await scrapingReview(data);
};

export const scraping = async () => {
  // 스크랩할 리스트 가져오기
  try {
    const data = dummyList;
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

// 구글플레이 상세 -> 컨트리 kr 적용시 에러 버젼업 할 예정인듯
// gplay
//   .app({ appId: dummyList[1].googlePlayAppId, lang: 'ko', country: 'kr' })
//   .then(console.log, console.log);

// 구글플레이 리뷰
// gplay
//   .reviews({
//     appId: dummyList[1].googlePlayAppId,
//     lang: 'ko',
//     country: 'kr',
//     sort: gplay.sort.NEWEST,
//     num: 100,
//   })
//   .then(console.log, console.log);

// 앱스토어 상세
// store
//   .app({ id: dummyList[0].appStoreId, lang: 'ko', country: 'kr' })
//   .then(console.log)
//   .catch(console.log);

// 앱스토어 리뷰 -> 날짜 데이터가 없어 스토어 라이브러리 사용못함, 직접 api 개발해야됨
// store
//   .reviews({
//     id: dummyList[0].appStoreId,
//     country: 'kr',
//     sort: store.sort.RECENT,
//     page: 1,
//   })
//   .then(console.log)
//   .catch(console.log);
