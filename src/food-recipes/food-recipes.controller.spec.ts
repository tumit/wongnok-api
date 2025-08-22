// food-recipes.controller.spec.ts
import { IdParamDto } from '@app/common/dto/id-param.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { testCreated, testCreateFoodRecipeDto, testDelete, testFindAll, testFindOne, testUpdatedUrl, testUpdateFoodRecipeDto } from '@test/helper/food-recipes.helper';
import { mock } from 'jest-mock-extended';
import { FoodRecipesController } from './food-recipes.controller';
import { FoodRecipesService } from './food-recipes.service';

describe('FoodRecipesController', () => {
  let controller: FoodRecipesController;
  let service = mock<FoodRecipesService>();

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

  it('should findAll', async () => {
    // arrange
    service.findAll.mockResolvedValue(testFindAll());
    // act
    const actual = await controller.findAll();
    // assert
    expect(actual).toEqual(testFindAll());
  });

  it('should findOne', async () => {
    // arrange
    const idParamDto: IdParamDto = { id: 1 };
    service.findOne.mockResolvedValue(testFindOne());
    // act
    const actual = await controller.findOne(idParamDto);
    // assert
    expect(actual).toEqual(testFindOne());
  });

  it('should create', async () => {
    // arrange
    service.create.mockResolvedValue(testCreated())
    // act
    const actual = await controller.create(testCreateFoodRecipeDto());
    // assert
    expect(actual).toEqual(testCreated());
  });


  it('should update', async () => {
    // arrange
    const idParamDto: IdParamDto = { id: 1 };
    service.update.mockResolvedValue(testUpdatedUrl())
    // act
    const actual = await controller.update(idParamDto, testUpdateFoodRecipeDto());
    // assert
    expect(actual).toEqual(testUpdatedUrl());
  });

  it('should delete', async () => {
    // arrange
    const idParamDto: IdParamDto = { id: 1 };
    service.remove.mockResolvedValue(testDelete())
    // act
    const actual = await controller.remove(idParamDto)
    // assert
    expect(actual).toEqual(testDelete())

  })

});
