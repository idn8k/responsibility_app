import dbConnect from '@/db/connect';
import Child from '@/db/models/Child';
import Task from '@/db/models/Task';
//!! API !!//
export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === 'GET') {
    try {
      const childItem = await Child.findById(id);
      if (!childItem) {
        response.status(404).json({ status: 'Child item not found...' });
        return;
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
      const deletedChild = await Child.findByIdAndDelete(id);
      if (!deletedChild) {
        return response.status(404).json({ error: 'Child not found' });
      }

      // Delete all tasks assigned to this child
      await Task.deleteMany({ assignee: id });

      response.status(200).json({
        message: 'Child and related tasks were deleted successfully!',
      });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }

    return;
  }

  if (request.method === 'PUT') {
    try {
      const updateChild = request.body;
      await Child.findByIdAndUpdate(id, updateChild);
      return response.status(200).json({ message: 'Child updated!' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error...' });
    }
    return;
  }

  response.status(405).json({ error: 'Method not allowed' });
}
//!! API !!//
