import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesService } from './food-recipes.service';
import { FoodRecipeEntity } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock } from 'jest-mock-extended';

describe('FoodRecipesService', () => {
  let service: FoodRecipesService;
  let repo = mock<Repository<FoodRecipeEntity>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodRecipesService, { provide: getRepositoryToken(FoodRecipeEntity), useValue: repo }],
    }).compile();

    service = module.get<FoodRecipesService>(FoodRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
