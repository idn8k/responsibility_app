import { hash } from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, name } = req.body;
  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exist...' });

  const hashedPassword = await hash(password, 10);

  await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    name,
  });
  res.status(201).json({ message: 'User created!' });
}
