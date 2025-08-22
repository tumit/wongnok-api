import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesService } from './food-recipes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { mock, mockDeep } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import {
  testCreated,
  testCreateFoodRecipeDto,
  testDelete,
  testFindAll,
  testFindOne,
  testUpdatedUrl,
  testUpdateFoodRecipeDto,
} from '@test/helper/food-recipes.helper';
import { IdParamDto } from '@app/common/dto/id-param.dto';
import { NotFoundException } from '@nestjs/common';

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

  it('should findOne', async () => {
    // arrange
    repository.findOneBy
      .calledWith(expect.objectContaining({ id: 1 }))
      .mockResolvedValue(testFindOne());
    // act
    const actual = await service.findOne(1);
    // assert
    expect(actual).toEqual(testFindOne());
  });

  it('should create', async () => {
    // arrange
    repository.save.mockResolvedValue(testCreated());
    // act
    const actual = await service.create(testCreateFoodRecipeDto());
    // assert
    expect(actual).toEqual(testCreated());
  });

  it('should update', async () => {
    // arrange
    repository.findOneByOrFail.mockResolvedValue(testFindOne());
    repository.save.mockResolvedValue(testUpdatedUrl());
    // act
    const actual = await service.update(2, testUpdateFoodRecipeDto());
    // assert
    expect(actual).toEqual(testUpdatedUrl());
  });

  it('should update fail when not found', async () => {
    // arrange
    repository.findOneByOrFail.mockRejectedValue({});
    // act
    // assert
    await expect(service.update(2, testUpdateFoodRecipeDto())).rejects.toThrow(
      new NotFoundException(`Not found: id=2`),
    );
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
