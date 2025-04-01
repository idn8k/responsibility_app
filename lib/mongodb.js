// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

//- split

// import mongoose from 'mongoose';
// const { MONGODB_URI } = process.env;
// export const connectDB = async () => {
//   try {
//     const { connection } = await mongoose.connect(MONGODB_URI);
//     if (connection.readyState === 1) {
//       return Promise.resolve(true);
//     }
//   } catch (error) {
//     console.error(error);
//     return Promise.reject(error);
//   }
// };

//- split

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to your .env.local file');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
