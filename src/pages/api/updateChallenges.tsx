import { VercelRequest, VercelResponse } from '@vercel/node';
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
  const { id, level, experience, challengesCompleted, amount } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  if (level !== 0) {
    await collection.updateOne(
      {_id: id},
      {
        $max: {
        "challenges.level": level,
        },
      },
    );
  } else {
    // $max: Only updates the field if the specified value is greater than the existing field value.
    await collection.updateOne(
      {_id: id},
      {
        $max: {
        "challenges.level": level,
        "challenges.challengesCompleted": challengesCompleted
        },
        $set: {
          "challenges.experience": experience
        },
        $inc: {
          "challenges.totalExperience": amount
        }
      },
    );
  }
  

  return response.status(201).json({ok: true});
} 