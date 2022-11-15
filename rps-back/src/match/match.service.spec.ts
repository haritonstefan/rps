import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getCollectionToken } from 'nest-mongodb';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getCollectionToken('match'),
          useValue: {
            new: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
