import dbConnect from '@/db/connect';
import cloudinary from '@/lib/cloudinary';
import Child from '@/db/models/Child'; // Assuming you store publicId on the Child model
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]'; // Adjust import path
//TODO: next steps:
//TODO: modify delete
//TODO: delete img from cloudinary when deleting a child
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
    // Find the database document that references this publicId and belongs to the user.
    // This prevents users from deleting images belonging to others.

    // Assuming publicId is stored directly on the Child model
    const childDocument = await Child.findOne({ publicId: publicId, user: session.user.id });

    if (!childDocument) {
      // If the document is not found or doesn't belong to the user,
      // we prevent deletion to avoid unauthorized access.
      console.warn(
        `Attempted deletion of publicId ${publicId} by user ${session.user.id} failed authorization.`
      );
      // You might want to differentiate between "not found" and "unauthorized",
      // but for security, treating unauthorized attempts as not found is often safer.
      return res.status(404).json({ error: 'Image not found or unauthorized.' });
    }

    // --- Delete the image from Cloudinary ---
    console.log(`Attempting to delete image with publicId: ${publicId} from Cloudinary.`);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Cloudinary deletion result:', result);

    // Cloudinary's destroy method returns a result object.
    // Check the result to confirm deletion (e.g., result.result === 'ok')
    if (result.result !== 'ok') {
      console.error('Cloudinary deletion failed:', result);
      // Handle potential Cloudinary errors during deletion
      return res.status(500).json({ error: 'Failed to delete image from Cloudinary.' });
    }

    // --- Optional: Remove the image reference from the database document ---
    // After successful deletion from Cloudinary, remove the imgUrl and publicId
    // from the corresponding database document.
    childDocument.imgUrl = undefined; // Or null, depending on your schema
    childDocument.publicId = undefined; // Or null
    await childDocument.save();
    console.log(`Removed image reference for publicId ${publicId} from database.`);

    // --- Success Response ---
    return res.status(200).json({ message: 'Image deleted successfully!' });
  } catch (error) {
    console.error('Error during image deletion process:', error);
    // Handle other potential errors (database errors, network issues)
    return res.status(500).json({ error: 'An error occurred during image deletion.' });
  }
}
