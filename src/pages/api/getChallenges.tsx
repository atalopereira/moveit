import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';

let cachedDb: Db = null;

async function connectToDataBase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const dbName = new URL(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const db = await connectToDataBase(process.env.MONGODB_URI);
  const collection = db.collection('challenges');
  const result = await collection.findOne({ _id: Number(request.query[0]) });
  
  if (result === null) {
    return response.status(404).json({});
  }

  return response.status(200).json({ result });
}