// food-recipes.helper.ts
import { CreateFoodRecipeDto } from "src/food-recipes/dto/create-food-recipe.dto";
import { UpdateFoodRecipeDto } from "src/food-recipes/dto/update-food-recipe.dto";
import { z } from 'zod';

export const foodRecipeSchema = z.object({
  id: z.number(),
  name: z.string(),
  ingredient: z.string(),
  instruction: z.string(),
  imageUrl: z.url(),
  difficultyId: z.number(),
  cookingDurationId: z.number(),
});

export const foodRecipeSchemas = z.array(foodRecipeSchema);

export function testCreateFoodRecipeDto(): CreateFoodRecipeDto {
  return {
    name: 'Spaghetti',
    description: 'A classic Italian pasta dish.',
    ingredient: 'Spaghetti, Tomato Sauce, Garlic, Olive Oil',
    instruction: 'Cook spaghetti, heat sauce, mix together.',
    imageUrl: 'https://foodish-api.com/images/pasta/pasta8.jpg',
    difficultyId: 1,
    cookingDurationId: 2,
  };
}

export function testUpdateFoodRecipeDto(): UpdateFoodRecipeDto {
  return {
    name: 'Super Spaghetti !!',
    imageUrl: 'https://foodish-api.com/images/pasta/pasta8.jpg',
  };
}
