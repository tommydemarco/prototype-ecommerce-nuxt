import { MongoClient } from "mongodb";

export async function withMongoClient<T>(
  handler: (client: MongoClient) => Promise<T>
): Promise<T> {
  const { mongodbURI }: any = useRuntimeConfig();
  const client = new MongoClient(mongodbURI);

  try {
    await client.connect();
    return await handler(client);
  } finally {
    await client.close();
  }
}
