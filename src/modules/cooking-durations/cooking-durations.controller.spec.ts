import { Test, TestingModule } from '@nestjs/testing';
import { CookingDurationsController } from './cooking-durations.controller';
import { CookingDurationsService } from './cooking-durations.service';

describe('CookingDurationsController', () => {
  let controller: CookingDurationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookingDurationsController],
      providers: [CookingDurationsService],
    }).compile();

    controller = module.get<CookingDurationsController>(CookingDurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
