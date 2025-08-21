import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesService } from './food-recipes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { mock, mockDeep } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { testDelete, testFindAll } from '@test/helper/food-recipes.helper';

describe('FoodRecipesService', () => {
  let service: FoodRecipesService;
  let repository = mockDeep<Repository<FoodRecipe>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodRecipesService,
        {
          provide: getRepositoryToken(FoodRecipe),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<FoodRecipesService>(FoodRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll', async () => {
    // arrange
    repository.find.mockResolvedValue(testFindAll());
    // act
    const actual = await service.findAll();
    // assert
    expect(actual).toEqual(testFindAll());
  });

  it('should remove', async () => {
    // arrange
    repository.delete
      .calledWith(expect.objectContaining({ id: 1 }))
      .mockResolvedValue(testDelete());
    // act
    const actual = await service.remove(1);
    // assert
    expect(actual).toEqual(testDelete());
  });
});
