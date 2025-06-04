import { IncomingForm } from 'formidable';
import fs from 'fs';
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/db/connect';
import Child from '@/db/models/Child';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// Disable Next.js body parser to use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.error('Error parsing form:', error);
      return res.status(500).json({ error: 'Error parsing form data.' });
    }

    const childId = fields.childId && fields.childId[0];
    const imageFile = files.image && files.image[0];

    if (!childId) {
      console.error('Child ID is missing in the form data for image upload.');
      return res.status(400).json({ error: 'Child ID is required for image upload.' });
    }

    if (!imageFile || typeof imageFile.filepath !== 'string') {
      console.error('No valid image file found or filepath is missing.');
      return res.status(400).json({ error: 'No valid image file uploaded.' });
    }

    let cloudinaryResult = null;

    //- Uploading image to Cloudinary:
    try {
      cloudinaryResult = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: 'children-profile-images',
      });

      const imgUrl = cloudinaryResult.secure_url;
      const publicId = cloudinaryResult.public_id;

      //- Find and Update the Child document with the image URL and publicId:

      try {
        const childToUpdate = await Child.findById(childId);

        if (!childToUpdate) {
          if (cloudinaryResult && cloudinaryResult.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
          }
          return res.status(404).json({ error: 'Child not found for image update.' });
        }

        //- Verify the child belongs to the logged-in user before updating:

        if (childToUpdate.user.toString() !== session.user.id) {
          if (cloudinaryResult && cloudinaryResult.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
          }
          console.error(
            `Unauthorized attempt to update child ${childId} by user ${session.user.id}. Child owner: ${childToUpdate.user}`
          );
          return res.status(403).json({ error: 'Unauthorized to update this child.' });
        }

        //- Upload the Child doc with img data:

        childToUpdate.imgUrl = imgUrl;
        childToUpdate.publicId = publicId;
        await childToUpdate.save();

        //- Respond with the image URL and publicId after successful update:

        return res.status(200).json({
          message: 'Image uploaded and child updated successfully',
          imgUrl: imgUrl,
          publicId: publicId,
        });
      } catch (mongoError) {
        console.error('MongoDB save error:', mongoError);

        //- Deleting image from Cloudinary if MongoDB save fails:
        if (cloudinaryResult && cloudinaryResult.public_id) {
          await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        }
        return res.status(500).json({ error: 'Failed updating child with image data.' });
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
