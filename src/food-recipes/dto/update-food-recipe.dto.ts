import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodRecipeDto } from './create-food-recipe.dto';

export class UpdateFoodRecipeDto extends PartialType(CreateFoodRecipeDto) {}
