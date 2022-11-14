import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { getCollectionToken } from 'nest-mongodb';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getCollectionToken('games'),
          useValue: {
            new: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
