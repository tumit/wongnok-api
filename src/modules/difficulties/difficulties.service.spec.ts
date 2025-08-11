import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DifficultiesService } from './difficulties.service';
import { Difficulty } from './entities/difficulty.entity';
import { mock } from 'jest-mock-extended';

describe('DifficultiesService', () => {
  let service: DifficultiesService;
  let repo: jest.Mocked<Repository<Difficulty>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DifficultiesService,
        {
          provide: getRepositoryToken(Difficulty),
          useValue: {
            find: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<DifficultiesService>(DifficultiesService);
    repo = module.get(getRepositoryToken(Difficulty));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all difficulties', async () => {
    repo.find.mockResolvedValue([{ id: 1, name: 'Easy' }, { id: 2, name: 'Medium' }])

    const actual = await service.findAll();

    expect(actual).toEqual([{ id: 1, name: 'Easy' }, { id: 2, name: 'Medium' }]);
  });
});
