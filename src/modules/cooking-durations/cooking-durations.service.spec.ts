import { Test, TestingModule } from '@nestjs/testing';
import { CookingDurationsService } from './cooking-durations.service';

describe('CookingDurationsService', () => {
  let service: CookingDurationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookingDurationsService],
    }).compile();

    service = module.get<CookingDurationsService>(CookingDurationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
