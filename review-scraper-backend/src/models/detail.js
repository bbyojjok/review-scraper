import mongoose from 'mongoose';
import { getList } from '../lib/api/index.js';

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
    const { data } = await getList();
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
