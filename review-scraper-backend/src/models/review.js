import mongoose from 'mongoose';
import * as listAPI from '../lib/api/list.js';
import { dummyList } from '../lib/dummyList.js';

const { Schema } = mongoose;

export const createReview = (name) => {
  return mongoose.model(
    `Review-${name}`,
    new Schema(
      {
        name: { type: String, required: true },
        os: String,
        review: Schema.Types.Mixed,
        date: { type: Date },
        createdAt: { type: Date, default: Date.now() },
      },
      { collection: `review-${name}` },
    ),
  );
};

const Review = async () => {
  try {
    // const { data } = await listAPI.getList();
    // 더미리스트로 테스트
    const data = dummyList;

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
