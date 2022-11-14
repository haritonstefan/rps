import { ConfigService } from '@nestjs/config';
import { MongoModuleOptions } from 'nest-mongodb';

export default function MongoConfigFactory(
  configService: ConfigService,
): MongoModuleOptions {
  return {
    uri: configService.get<string>('MONGO_URL'),
    dbName: 'rps',
    clientOptions: {},
  };
}
