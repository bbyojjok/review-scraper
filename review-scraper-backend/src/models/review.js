import mongoose from 'mongoose';
import * as listAPI from '../lib/api/list';

const { Schema } = mongoose;

export const createReview = (name) => {
  return mongoose.model(
    `Review-${name}`,
    new Schema({}, { collection: `Review-${name}` }),
  );
};

const Review = async () => {
  try {
    const { data } = await listAPI.getList();
    return data.reduce((acc, cur) => {
      acc[cur.name] = createReview(cur.name);
      return acc;
    }, {});
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default Review;
