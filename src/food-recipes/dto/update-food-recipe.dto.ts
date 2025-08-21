import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodRecipeDto, createFoodRecipeSchema } from './create-food-recipe.dto';
import { createZodDto } from 'nestjs-zod';

const updateFoodRecipeDtoSchema = createFoodRecipeSchema.partial()

export class UpdateFoodRecipeDto extends createZodDto(updateFoodRecipeDtoSchema) {}
