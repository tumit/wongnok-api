import { Test, TestingModule } from '@nestjs/testing';
import { CookingDurationsService } from './cooking-durations.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { CookingDuration } from './entities/cooking-duration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CookingDurationsService', () => {
  let service: CookingDurationsService;
  const repository = mock<Repository<CookingDuration>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CookingDurationsService,
        { provide: getRepositoryToken(CookingDuration), useValue: repository },
      ],
    }).compile();

    service = module.get<CookingDurationsService>(CookingDurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of cooking-duration', async () => {

    repository.find.mockResolvedValue([{ id: 1, name: '5 - 10'}])

    const actual = await service.findAll();

    const expected = [{ id: 1, name: '5 - 10' }];
    expect(actual).toEqual(expected);
  });
});
