import dbConnect from '@/db/connect';
import Task from '@/db/models/Task';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

//!! API !!//

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  console.log('********************');
  console.log('SESSION:', session);
  console.log('********************');

  if (request.method === 'GET') {
    try {
      const childId = session.user.id;
      console.log(' handler ~ childId:', childId);
      const tasks = await Task.find({ 'assignee.user': childId }).populate('assignee');
      console.log(' handler ~ tasks:', tasks);

      response.status(200).json(tasks);
      return;
    } catch (error) {
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
