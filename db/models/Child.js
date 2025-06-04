import mongoose from 'mongoose';

const { Schema } = mongoose;

const childSchema = new Schema({
  name: { type: String, required: true },
  birth_date: { type: String, required: true },
  imgUrl: { type: String },
  publicId: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Child = mongoose.models.Child || mongoose.model('Child', childSchema, 'children');

export default Child;
