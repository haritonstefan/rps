import { MongoClient } from 'mongodb';

export interface ISeed {
  run(client: MongoClient): Promise<void>;
}
