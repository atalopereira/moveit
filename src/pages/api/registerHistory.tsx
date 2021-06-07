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
  const { id, experience } = request.body;
  
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  const date = new Date();
  const weekDay = date.getDay();

  // Need improve
  switch (weekDay) {
    case 0:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.domingo": experience
          }
        }
      );
    break;
    case 1:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.segunda": experience
          }
        }
      );
    break;
    case 2:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.terça": experience
          }
        }
      );
    break;
    case 3:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.quarta": experience
          }
        }
      );
    break;
    case 4:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.quinta": experience
          }
        }
      );
    break;
    case 5:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.sexta": experience
          }
        }
      );
    break;
    case 6:
      await collection.updateOne(
        {_id: id},
        {
          $inc: {
            "history.sábado": experience
          }
        }
      );
    break;
  }

  return response.status(201).json({ Ok: true });
}
