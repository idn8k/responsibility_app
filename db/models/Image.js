import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String, // image id from Cloudinary
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  // Can add other fields related to the img
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});

// Prevent Mongoose from recreating the model in development:
const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
