import dbConnect from '@/db/connect';
import Child from '@/db/models/Child';
import Task from '@/db/models/Task';
import cloudinary from '@/lib/cloudinary'; // Import cloudinary
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';

//- API -//
export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    return response.status(401).json({ error: 'Authentication required' });
  }

  if (request.method === 'GET') {
    try {
      const childItem = await Child.findById(id);
      if (!childItem) {
        response.status(404).json({ status: 'Child item not found...' });
        return;
      }

      if (childItem.user.toString() !== session.user.id) {
        return response.status(403).json({ error: 'Unauthorized to view this child.' });
      }

      response.status(200).json(childItem);
      return;
    } catch (error) {
      console.error('ERROR:', error);
      response.status(500).json({ message: 'Internal Server Error.' });
      return;
    }
  }

  if (request.method === 'DELETE') {
    try {
      const childToDelete = await Child.findById(id);

      if (!childToDelete) {
        return response.status(404).json({ error: 'Child not found' });
      }

      if (childToDelete.user.toString() !== session.user.id) {
        return response.status(403).json({ error: 'Unauthorized to delete this child.' });
      }

      if (childToDelete.publicId) {
        try {
          console.log(`Trying to delete a child with publicId: ${childToDelete.publicId}`);
          const cloudinaryResult = await cloudinary.uploader.destroy(childToDelete.publicId);
          console.log('Cloudinary deletion result:', cloudinaryResult);

          if (cloudinaryResult.result !== 'ok') {
            console.warn(
              `Cloudinary deletion failed for publicId ${childToDelete.publicId}: ${cloudinaryResult.result}`
            );
            //TODO: to decide how to handle this warning
          }
        } catch (cloudinaryError) {
          console.error(`Error deleting image from Cloudinary for child ${id}:`, cloudinaryError);
          //TODO: to decide if to stop deletion
        }
      }
      // Deleting:
      await Child.findByIdAndDelete(id);
      await Task.deleteMany({ assignee: id });

      response.status(200).json({
        message: 'Child and tasks deleted successfully!',
      });
    } catch (error) {
      console.error('Error during child deletion process:', error);
      response.status(500).json({ error: 'Failed to delete child: ' + error.message });
    }

    return;
  }

  if (request.method === 'PUT') {
    try {
      const updateChild = request.body;

      const childToUpdate = await Child.findById(id);
      if (!childToUpdate) {
        return response.status(404).json({ error: 'Child not found.' });
      }

      if (childToUpdate.user.toString() !== session.user.id) {
        return response.status(403).json({ error: 'Unauthorized to update this child.' });
      }

      // Updating:
      childToUpdate.name = updateChild.name;
      childToUpdate.birth_date = updateChild.birth_date;
      await childToUpdate.save();

      //TODO: to decide if updating spesific props or the child doc directy
      // Alternative for direct field update if `updateChild` only contains name/birth_date:
      // await Child.findByIdAndUpdate(id, updateChild, { new: true });
      return response.status(200).json({ message: 'Child updated!' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error...' });
    }
    return;
  }

  response.status(405).json({ error: 'Method not allowed' });
}
//-!! API !!-//
