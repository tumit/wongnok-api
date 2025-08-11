import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesController } from './food-recipes.controller';
import { FoodRecipesService } from './food-recipes.service';
import { mock } from 'jest-mock-extended';
import { DifficultiesService } from '../difficulties/difficulties.service';
import { resolve } from 'path';
import { CreateFoodRecipeDtoResponse } from './dto/create-food-recipe.dto';

describe('FoodRecipesController', () => {
  let controller: FoodRecipesController;
  const service = mock<FoodRecipesService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodRecipesController],
      providers: [
        {
          provide: FoodRecipesService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<FoodRecipesController>(FoodRecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return food-recipe', async () => {
    service.create.mockResolvedValue({ id: 2 });

    const actual = await controller.create({});

    expect(actual).toEqual({ id: 2 });
  });
});
