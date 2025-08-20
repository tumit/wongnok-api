import { setSeederFactory } from 'typeorm-extension';
import { FoodRecipeEntity } from '../modules/food-recipes/entities/food-recipe.entity';

import { Difficulty } from '../modules/difficulties/entities/difficulty.entity';
import { fa, faker } from '@faker-js/faker';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { randomUuid } from 'testcontainers';
import { User } from '../modules/users/entities/user.entity';

const fakeIngredients = (): string => {
  return Array.from({ length: Math.floor(Math.random() * 3) + 5 }, () =>
    faker.food.ingredient(),
  ).join(',');
};

export const fakeFoodRecipeEntity = (): FoodRecipeEntity => {
  const foodRecipeEntity = new FoodRecipeEntity();
  foodRecipeEntity.name = faker.food.dish();
  foodRecipeEntity.description = `${faker.food.adjective()} ${faker.food.ethnicCategory()} ${foodRecipeEntity.name}`;
  foodRecipeEntity.ingredient = fakeIngredients();
  foodRecipeEntity.instruction = faker.food.description();
  foodRecipeEntity.difficulty = {
    id: faker.number.int({ min: 1, max: 3 }),
  } as Difficulty;
  foodRecipeEntity.cookingDurationId = faker.number.int({ min: 1, max: 4 });
  foodRecipeEntity.imageUrl = faker.image.url();
  foodRecipeEntity.user = { id: randomUuid() } as User;
  return foodRecipeEntity;
};

export const FoodRecipeFactory = setSeederFactory(
  FoodRecipeEntity,
  fakeFoodRecipeEntity,
);
