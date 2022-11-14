import * as mongo from 'mongodb';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectCollection } from 'nest-mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectCollection('players')
    private readonly playerCollection: mongo.Collection,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    let player = await this.playerCollection.findOne({
      username: loginDto.username,
    });
    if (!player) {
      await this.playerCollection.insertOne({
        username: loginDto.username,
      });

      player = await this.playerCollection.findOne({
        username: loginDto.username,
      });
    }

    return player._id.toString();
  }
}
