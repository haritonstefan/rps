import * as mongo from 'mongodb';
import { Injectable } from '@nestjs/common';
import {
  LoginDto,
  LoginResponseDto,
  LoginValidateResponseDto,
} from './dto/login.dto';
import { InjectCollection } from 'nest-mongodb';
import { ObjectId } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectCollection('players')
    private readonly playerCollection: mongo.Collection,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
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

    return { token: player._id.toString() };
  }

  async validate(id: string): Promise<LoginValidateResponseDto> {
    if (!ObjectId.isValid(id)) return { isValid: false };

    const count = await this.playerCollection.countDocuments({
      _id: new ObjectId(id),
    });

    return { isValid: count === 1 };
  }
}
