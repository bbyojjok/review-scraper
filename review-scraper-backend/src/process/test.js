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

const reviewGooglePlay = await scrapingReviewGooglePlay(
  'com.hdmallapp.thehyundai',
);
// console.log(reviewGooglePlay);

// com.hdmallapp.thehyundai
// com.thehyundai.tohome
const googlePlay = await scrapingDetailGooglePlay('com.hdmallapp.thehyundai');
// console.log(googlePlay);

const appStore = await scrapingDetailAppStore(1067693191);
console.log(appStore);

/*
https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/43/75/db/4375dbbc-52d7-8fcc-98b0-6c8e60edc2ec/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg
https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/43/75/db/4375dbbc-52d7-8fcc-98b0-6c8e60edc2ec/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg
*/
