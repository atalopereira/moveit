import { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
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
  const { username, name, id } = request.body;
  
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  await collection.insertOne({
    _id: id,
    username,
    name,
    challenges: {
      level: 1,
      experience: 0,
      challengesCompleted: 0,
      totalExperience: 0
    },
    history: {
      segunda: 0,
      terça: 0,
      quarta: 0,
      quinta: 0,
      sexta: 0,
      sábado: 0,
      domingo: 0
    }
  });

  return response.status(201).json({ Ok: true });
}