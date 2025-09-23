import { createZodDto } from 'nestjs-zod';
import { createFoodRecipeSchema } from './create-food-recipe.dto';

const updateFoodRecipeSchema = createFoodRecipeSchema.partial();

export class UpdateFoodRecipeDto extends createZodDto(updateFoodRecipeSchema) {}
