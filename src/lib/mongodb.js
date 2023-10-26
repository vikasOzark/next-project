import { MongoClient } from 'mongodb';

const uri = process.env("DATABASE_URL");

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db('test'); // Replace with your database name
}
