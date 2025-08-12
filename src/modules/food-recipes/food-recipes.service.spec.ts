import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockSelectQueryBuilder } from '@root/test/utils/jest-mock-typeorm';
import { FoodRecipeEntity } from './entities/food-recipe.entity';
import { FoodRecipesService } from './food-recipes.service';

interface FoodRecipeResponse {
  id: number;
  name: string;
  difficulty: Difficulty;
}
interface Difficulty {
  id: number;
  name: string;
}

describe('FoodRecipesService', () => {
  let service: FoodRecipesService;
  const { repository, queryBuilder } =
    mockSelectQueryBuilder<FoodRecipeResponse>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodRecipesService,
        { provide: getRepositoryToken(FoodRecipeEntity), useValue: repository },
      ],
    }).compile();

    service = module.get<FoodRecipesService>(FoodRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return list of food-recipe', async () => {
    // arrange
    queryBuilder.getMany.mockResolvedValue([
      {
        id: 2,
        name: 'Spaghetti',
        difficulty: {
          id: 1,
          name: 'Easy',
        },
      },
      {
        id: 3,
        name: 'Spaghetti',
        difficulty: {
          id: 1,
          name: 'Easy',
        },
      },
    ]);
    // act
    const actual = await service.findAll();

    // assert
    const expected = [
      {
        id: 2,
        name: 'Spaghetti',
        difficulty: {
          id: 1,
          name: 'Easy',
        },
      },
      {
        id: 3,
        name: 'Spaghetti',
        difficulty: {
          id: 1,
          name: 'Easy',
        },
      },
    ];
    expect(actual).toEqual(expected);
  });
});
