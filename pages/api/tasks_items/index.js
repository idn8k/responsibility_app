import dbConnect from '@/db/connect';
import Task from '@/db/models/Task';
import Child from '@/db/models/Child';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

//!! API !!//

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);

  if (request.method === 'GET') {
    const userId = session.user.id;

    try {
      const childrenOfUser = await Child.find({ user: userId }).select('_id');
      const childIds = childrenOfUser.map((child) => child._id);

      if (childIds.length === 0) {
        response.status(200).json([]);
        return;
      }

      const tasks = await Task.find({ assignee: { $in: childIds } }).populate('assignee');

      response.status(200).json(tasks);
      return;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === 'POST') {
    try {
      const taskData = request.body;

      await Task.create(taskData);
      response.status(200).json({ status: 'Task created!' });
      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === 'PUT') {
    try {
      const updateTask = request.body;

      await Task.findByIdAndUpdate(updateTask._id, updateTask);

      response.status(200).json({ status: 'Task was updated' });
      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
      return;
    }
  }

  response.status(405).json({ error: 'Method not allowed' });
}

//!! API !!//
