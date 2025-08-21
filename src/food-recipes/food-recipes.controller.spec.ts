import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesController } from './food-recipes.controller';
import { FoodRecipesService } from './food-recipes.service';

describe('FoodRecipesController', () => {
  let controller: FoodRecipesController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodRecipesController],
      providers: [
        {
          provide: FoodRecipesService,
          useValue: service
        }
      ],
    }).compile();

    controller = module.get<FoodRecipesController>(FoodRecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
