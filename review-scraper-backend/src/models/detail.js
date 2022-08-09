import mongoose from 'mongoose';
import * as listAPI from '../lib/api/list';

const { Schema } = mongoose;

export const createDetail = (name) => {
  return mongoose.model(
    `Detail-${name}`,
    new Schema(
      {
        name: { type: String, required: true, unique: true },
        anroid: Schema.Types.Mixed,
        ios: Schema.Types.Mixed,
        createdAt: { type: Date, default: Date.now() },
      },
      { collection: `Detail-${name}` },
    ),
  );
};

const Detail = async () => {
  try {
    const { data } = await listAPI.getList();
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
