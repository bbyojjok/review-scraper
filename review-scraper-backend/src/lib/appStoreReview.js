import axios from 'axios';

const appStoreReview = async ({ id, country, page }) => {
  try {
    const url = `https://itunes.apple.com/rss/customerreviews/page=${page}/id=${id}/sortby=mostrecent/json?cc=${country}`;
    const { data } = await axios.get(url);
    const { entry } = data.feed;

    if (entry) {
      return entry.reduce((acc, cur) => {
        const review = {};
        review.id = cur.id.label;
        review.app = id;
        review.author = cur.author.name.label;
        review.version = cur['im:version'].label;
        review.rate = cur['im:rating'].label;
        review.title = cur.title.label;
        review.comment = cur.content.label;
        review.vote = cur['im:voteCount'].label;
        review.date = cur.updated.label;
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
