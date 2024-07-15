import gplay from 'google-play-scraper';
import store from 'app-store-scraper';
import { trimTitle } from '../lib/utility.js';

export const scrapingDetailGooglePlay = async (appId) => {
  try {
    const { version, score, url, icon, title } = await gplay.app({
      appId,
      lang: 'ko',
      country: 'kr',
    });
    return { version, score, url, icon, title: trimTitle(title) };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingReviewGooglePlay = async (appId) => {
  try {
    const { data } = await gplay.reviews({
      appId,
      lang: 'ko',
      country: 'kr',
      sort: gplay.sort.NEWEST,
      num: 3000, // 3000
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingDetailAppStore = async (id) => {
  try {
    const { version, score, url, icon, title } = await store.app({
      id,
      lang: 'ko',
      country: 'kr',
    });
    return { version, score, url, icon, title: trimTitle(title) };
  } catch (e) {
    console.error(e);
    return null;
  }
};

const scrapingReviewAppStore = async (appStoreId) => {
  try {
    const data = await store.reviews({
      id: appStoreId,
      country: 'kr',
      page: 1,
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// const reviewAppstore = await scrapingReviewAppStore(397938216);
// console.log(reviewAppstore);

const detailGooglePlay = await scrapingDetailGooglePlay(
  'com.hdmallapp.thehyundai',
);
console.log(detailGooglePlay);

// https://play-lh.googleusercontent.com/uKx_KtTwMZ0GQHtg6TOS66lbB-xQ4cUgRYooMtYkk5Sxc-CkkhR7OB_bfFqAi5rjb5H5

// com.hdmallapp.thehyundai
// com.thehyundai.tohome
// const googlePlay = await scrapingDetailGooglePlay('com.coupang.mobile');
// console.log(googlePlay);

// const appStore = await scrapingDetailAppStore(1067693191);
// console.log(appStore);
