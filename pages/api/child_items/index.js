import dbConnect from '@/db/connect';
import Child from '@/db/models/Child';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.id) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  if (request.method === 'GET') {
    try {
      const adminUserId = session.user.id;
      const children = await Child.find({ user: adminUserId }).lean();
      console.log('**********************************');
      console.log(' handler ~ children:', children);
      console.log('**********************************');

      response.status(200).json(children);
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  }
}

if (request.method === 'POST') {
  try {
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    const childData = request.body;
    const userId = session.user.id;

    const newChild = { ...childData, user: userId };

    await Child.create(newChild);

    response.status(200).json({ status: 'New child created!' });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}
