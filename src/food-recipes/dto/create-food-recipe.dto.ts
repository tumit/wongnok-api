// create-food-recipe.dto.ts
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod';

export const createFoodRecipeSchema = z.object({
  name: z.string().min(1, 'name is required'),
  description: z.string().min(1, 'description is required'),
  ingredient: z.string().min(1, 'ingredient is required'),
  instruction: z.string().min(1, 'instruction is required'),
  imageUrl: z.url('image must be a valid URL').optional(),
  difficulty: z.object({
    id: z.number().int().positive('difficulty.id must be a positive number')
  }),
  cookingDuration: z.object({
    id: z.number().int().positive('cookingDuration.id must be a positive number')
  }),
  user: z.object({
    id: z.number().int().positive('user.id must be a positive number')
  })
});

export class CreateFoodRecipeDto extends createZodDto(createFoodRecipeSchema) {}
