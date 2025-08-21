// create-food-recipe.dto.ts
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod';

export const createFoodRecipeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  ingredient: z.string().min(1, 'Ingredient is required'),
  instruction: z.string().min(1, 'Instruction is required'),
  imageUrl: z.url('Image must be a valid URL').optional(),
  difficultyId: z.number().int().positive('Difficulty must be a positive number'),
  cookingDurationId: z.number().int().positive('Cooking duration must be a positive number'),
});

export class CreateFoodRecipeDto extends createZodDto(createFoodRecipeSchema) {}
