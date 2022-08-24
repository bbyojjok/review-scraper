import mongoose from 'mongoose';

const { Schema } = mongoose;

const ListSchema = new Schema({
  name: { type: String, required: true },
  googlePlayAppId: String,
  appStoreId: Number,
  icon: String,
  createdAt: { type: Date, default: Date.now() },
});

const List = mongoose.model('list', ListSchema);

export default List;
