// food-recipes.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FoodRecipesController } from './food-recipes.controller';
import { FoodRecipesService } from './food-recipes.service';
import { testFindAll, testFindOne } from '@test/helper/food-recipes.helper';
import { mock } from 'jest-mock-extended';
import { IdParamDto } from '@app/common/dto/id-param.dto';

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
});
