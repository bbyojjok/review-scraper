import mongoose from 'mongoose';
import * as listAPI from '../lib/api/list.js';
import { dummyList } from '../lib/dummyList.js';

const { Schema } = mongoose;

export const createDetail = (name) => {
  return mongoose.model(
    `Detail-${name}`,
    new Schema(
      {
        name: { type: String, required: true },
        googlePlay: Schema.Types.Mixed,
        appStore: Schema.Types.Mixed,
        createdAt: { type: Date, default: Date.now() },
      },
      { collection: `detail-${name}` },
    ),
  );
};

const Detail = async () => {
  try {
    // const { data } = await listAPI.getList();
    // 더미리스트로 테스트
    const data = dummyList;

    return data.reduce((acc, cur) => {
      acc[cur.name] = createDetail(cur.name);
      return acc;
    }, {});
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default Detail;
