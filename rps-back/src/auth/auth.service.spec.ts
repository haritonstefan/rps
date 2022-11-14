import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getCollectionToken } from 'nest-mongodb';
import { Collection, ObjectId } from 'mongodb';

describe('AuthService', () => {
  let service: AuthService;
  let playersCollection: Collection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getCollectionToken('players'),
          useValue: {
            new: jest.fn(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            countDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    playersCollection = module.get(getCollectionToken('players'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the id of an existing user', async () => {
    const oId = new ObjectId();
    const spy = jest
      .spyOn(playersCollection, 'findOne')
      .mockImplementationOnce(() => Promise.resolve({ _id: oId }));

    const userId = await service.login({ username: 'abc' });

    expect(userId).toEqual(oId.toString());
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('should create a new user', async () => {
    const oId = new ObjectId();
    const findMock = jest
      .spyOn(playersCollection, 'findOne')
      .mockImplementationOnce(() => Promise.resolve(null))
      .mockImplementationOnce(() => Promise.resolve({ _id: oId }));

    const createMock = jest
      .spyOn(playersCollection, 'insertOne')
      .mockImplementationOnce(() => Promise.resolve({}));

    const userId = await service.login({ username: 'abc' });

    expect(userId).toEqual(oId.toString());
    expect(findMock).toHaveBeenCalledTimes(2);
    expect(createMock).toHaveBeenCalledTimes(1);

    findMock.mockRestore();
    createMock.mockRestore();
  });

  it('should return true if the user exists', async () => {
    const oId = new ObjectId().toString();

    const countDocumentsMock = jest
      .spyOn(playersCollection, 'countDocuments')
      .mockImplementation(() => Promise.resolve(1));

    const isValid = await service.validate(oId);

    expect(isValid).toBe(true);
    expect(countDocumentsMock).toHaveBeenCalledTimes(1);

    countDocumentsMock.mockRestore();
  });

  it('should return false if the user does not exist', async () => {
    const oId = new ObjectId().toString();

    const countDocumentsMock = jest
      .spyOn(playersCollection, 'countDocuments')
      .mockImplementation(() => Promise.resolve(0));

    const isValid = await service.validate(oId);

    expect(isValid).toBe(false);
    expect(countDocumentsMock).toHaveBeenCalledTimes(1);

    countDocumentsMock.mockRestore();
  });
  it('should return false if an invalid ObjectId string is supplied', async () => {
    const oId = 'not-an-OId';

    const countDocumentsMock = jest
      .spyOn(playersCollection, 'countDocuments')
      .mockImplementation(() => Promise.resolve(0));

    const isValid = await service.validate(oId);

    expect(isValid).toBe(false);
    // it should not call the count documents if the id is invalid
    expect(countDocumentsMock).toHaveBeenCalledTimes(0);

    countDocumentsMock.mockRestore();
  });
});
