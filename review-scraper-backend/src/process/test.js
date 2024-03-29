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

const reviewGooglePlay = await scrapingReviewGooglePlay('com.coupang.mobile');
console.log(reviewGooglePlay);

// com.hdmallapp.thehyundai
// com.thehyundai.tohome
// const googlePlay = await scrapingDetailGooglePlay('com.coupang.mobile');
// console.log(googlePlay);

// const appStore = await scrapingDetailAppStore(454434967);
// console.log(appStore);
