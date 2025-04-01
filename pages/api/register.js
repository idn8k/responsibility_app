import { hash } from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, name } = req.body;
  const client = await clientPromise;
  const db = client.db();

  try {
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ message: 'User already exist...' });

    const hashedPassword = await hash(password, 10);

    await db.collection('users').insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    });
    res.status(201).json({ message: 'User created!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to create user...' });
  }
}
