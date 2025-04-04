import dbConnect from '@/db/connect';
import Child from '@/db/models/Child';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === 'GET') {
    const children = await Child.find();

    response.status(200).json(children);

    return;
  }

  if (request.method === 'POST') {
    try {
      const childData = request.body;
      await Child.create(childData);

      response.status(200).json({ status: 'New child created!' });

      return;
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  response.status(405).json({ error: 'Method not allowed' });
}
