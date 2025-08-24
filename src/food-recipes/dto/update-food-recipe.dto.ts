// update-food-recipe.dto.ts
import { createZodDto } from 'nestjs-zod';
import { createFoodRecipeSchema } from './create-food-recipe.dto';

const updateFoodRecipeDtoSchema = createFoodRecipeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update',
  });

export class UpdateFoodRecipeDto extends createZodDto(
  updateFoodRecipeDtoSchema,
) {}
