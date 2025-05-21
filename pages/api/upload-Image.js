import { IncomingForm } from 'formidable';
import fs from 'fs';
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/db/connect';
import Image from '@/db/models/Image';

// Disable Next.js body parser to use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form data.' });
    }

    const imageFile = files.image && files.image[0]; // ('image' matches append key in FormData)

    if (!imageFile) {
      return res.status(400).json({ error: 'No image file uploaded.' });
    }

    //- Uploading image to Cloudinary
    try {
      const result = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: 'children-profile-images',
      });

      const imageUrl = result.secure_url; // Get the secure URL from Cloudinary

      // Saving image URL and other metadata to Mongo using Mongoose
      try {
        const newImage = new Image({
          imageUrl: imageUrl,
          publicId: result.public_id, // Store Cloudinary's public_id for future management
          uploadedAt: new Date(),
        });

        await newImage.save();

        return res.status(200).json({
          message: 'Image uploaded successfully',
          imageUrl: imageUrl,
          mongoId: newImage._id,
        });
      } catch (mongoError) {
        console.error('MongoDB save error:', mongoError);

        // Deleting image from Cloudinary if MongoDB save fails:
        if (result && result.public_id) {
          await cloudinary.uploader.destroy(result.public_id);
        }

        return res.status(500).json({ error: 'Failed saving image to database.' });
      }
    } catch (cloudinaryError) {
      console.error('Cloudinary upload error:', cloudinaryError);
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
    } finally {
      // Cleaning up temporary file created by formidable:
      if (imageFile && typeof imageFile.filepath === 'string') {
        fs.unlink(imageFile.filepath, (err) => {
          if (err) console.error('Error removing temp file:', err);
        });
      } else {
        console.warn('Temporary file path not available for cleanup.');
      }
    }
  });
}
