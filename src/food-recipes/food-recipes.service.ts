import { Injectable } from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';

@Injectable()
export class FoodRecipesService {
  create(createFoodRecipeDto: CreateFoodRecipeDto) {
    return 'This action adds a new foodRecipe';
  }

  findAll() {
    return `This action returns all foodRecipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodRecipe`;
  }

  update(id: number, updateFoodRecipeDto: UpdateFoodRecipeDto) {
    return `This action updates a #${id} foodRecipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodRecipe`;
  }
}
