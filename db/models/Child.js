import mongoose from "mongoose";

const { Schema } = mongoose;

const childSchema = new Schema({
  name: { type: String, required: true },
  birth_date: { type: String, required: true },
  imgUrl: { type: Number, required: true },
});

const Child = mongoose.models.Child || mongoose.model("Joke", childSchema);

export default Child;
