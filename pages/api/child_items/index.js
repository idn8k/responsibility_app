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

    response.status(200).json(children);

    return;
  }

  if (request.method === 'POST') {
    try {
      const childData = request.body;
      const childDataWithUserId = { ...childData, user: session.user.id };

      await Child.create(childDataWithUserId);

      response.status(200).json({ status: 'New child created!' });

      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  response.status(405).json({ error: 'Method not allowed' });
}
