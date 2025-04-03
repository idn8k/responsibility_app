// pages/api/db_test.js
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Try to access a collection. If the connection isn't working,
    // this will throw an error.
    await db.collection('users').findOne({});

    res.status(200).json({ success: true, message: 'Database connection successful!' });
  } catch (e) {
    console.error('DB Connection Error:', e);
    res
      .status(500)
      .json({ success: false, message: 'Database connection failed!', error: e.message });
  }
}
