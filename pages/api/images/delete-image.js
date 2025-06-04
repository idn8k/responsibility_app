import dbConnect from '@/db/connect';
import cloudinary from '@/lib/cloudinary';
import Child from '@/db/models/Child';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the publicId from the request body
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: 'Public ID is required for deletion.' });
  }

  try {
    // --- Authorization Check: Ensure the image belongs to the logged-in user ---

    const childDocument = await Child.findOne({ publicId: publicId, user: session.user.id });

    if (!childDocument) {
      console.warn(
        `Attempted deletion of publicId ${publicId} by user ${session.user.id} failed authorization.`
      );

      return res.status(404).json({ error: 'Image not found or unauthorized.' });
    }

    // --- Delete the image from Cloudinary ---
    console.log(`Attempting to delete image with publicId: ${publicId} from Cloudinary.`);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary deletion result:', result);

    if (result.result !== 'ok') {
      console.error('Cloudinary deletion failed:', result);
      return res.status(500).json({ error: 'Failed to delete image from Cloudinary.' });
    }

    // --- Optional: Remove the image reference from the database document ---

    childDocument.imgUrl = undefined;
    childDocument.publicId = undefined;
    await childDocument.save();
    console.log(`Removed image reference for publicId ${publicId} from database.`);

    // --- Success Response ---
    return res.status(200).json({ message: 'Image deleted successfully!' });
  } catch (error) {
    console.error('Error during image deletion process:', error);
    return res.status(500).json({ error: 'An error occurred during image deletion.' });
  }
}
