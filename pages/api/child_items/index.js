import dbConnect from '@/db/connect';
import Child from '@/db/models/Child';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  if (request.method === 'GET') {
    const userId = session.user.id;
    const children = await Child.find({ user: userId });

    return response.status(200).json(children);
  }

  if (request.method === 'POST') {
    try {
      const { name, birth_date } = request.body;

      if (!name || !birth_date) {
        response.status(400).json({ error: 'Name and birth date are required.' });
      }
      const childDataWithUserId = { name, birth_date, user: session.user.id };

      const newChild = await Child.create(childDataWithUserId);

      return response.status(201).json({ status: 'New child created!', child: newChild });
    } catch (error) {
      crossOriginIsolated.error('Error creating a new child:', error);
      response.status(400).json({ error: error.message });
    }
  }

  response.status(405).json({ error: 'Method not allowed' });
}
