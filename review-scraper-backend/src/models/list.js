import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListSchema = new Schema({
  name: { type: String, required: true, unique: true },
  googlePlayAppId: String,
  appStoreId: Number,
  image: String,
  createdAt: { type: Date, default: Date.now() },
});

const List = mongoose.model('List', ListSchema);

export default List;
