import gplay from 'google-play-scraper';
import store from 'app-store-scraper';
import { dummyList } from '../lib/dummyList';

console.log('dummyList:', dummyList);

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
