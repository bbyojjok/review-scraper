import axios from 'axios';
import xml2js from 'xml2js';

const { parseStringPromise } = xml2js;

function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

const appStoreReview = async ({ id, country, page }) => {
  try {
    const url = `https://itunes.apple.com/${country}/rss/customerreviews/page=${page}/id=${id}/sortby=mostrecent/xml`;
    const res = await axios.get(url);
    const filter = replaceAll(res.data, '<</', '</');
    const data = await parseStringPromise(replaceAll(filter, '<&lt;&lt;', ''));
    const entry = data['feed']['entry'];

    if (entry) {
      return entry.reduce((acc, cur) => {
        const review = {};
        review.id = cur['id'][0];
        review.app = id;
        review.author = cur['author'][0]['name'][0];
        review.version = cur['im:version'][0];
        review.rate = cur['im:rating'][0];
        review.title = cur['title'][0];
        review.comment = cur['content'][0]['_'];
        review.vote = cur['im:voteCount'][0];
        review.date = cur['updated'][0];
        review.country = country;
        acc.push(review);
        return acc;
      }, []);
    }
    return [];
  } catch (err) {
    console.error(`[ERROR/appStoreReview Library] ${err}`);
    return [];
  }
};

export default appStoreReview;
