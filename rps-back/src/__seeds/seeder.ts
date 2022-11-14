import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

async function seeder() {
  const client = new MongoClient(process.env.MONGO_URL);
  const seeds = await Promise.all([import('./game-seed')]);
  for (const seed of seeds) {
    await new seed.default().run(client);
  }
}

seeder()
  .then(() => {
    console.log('seeding done');
    process.exit(0);
  })
  .catch((err) => {
    console.log('seeding failed');
    console.error(err.message);
    process.exit(1);
  });
