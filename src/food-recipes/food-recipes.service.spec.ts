import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesService } from './food-recipes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';

describe('FoodRecipesService', () => {
  let service: FoodRecipesService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodRecipesService,
        {
          provide: getRepositoryToken(FoodRecipe),
          useValue: repository
        }],
    }).compile();

    service = module.get<FoodRecipesService>(FoodRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
