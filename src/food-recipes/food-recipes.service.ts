// food-recipes.service.ts
import { Injectable } from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodRecipesService {
  constructor(
    @InjectRepository(FoodRecipe)
    private foodRecipeRepository: Repository<FoodRecipe>,
  ) {}

  create(createFoodRecipeDto: CreateFoodRecipeDto) {
    console.log('createFoodRecipeDto', createFoodRecipeDto);
    return this.foodRecipeRepository.save(createFoodRecipeDto);
  }

  findAll() {
    return this.foodRecipeRepository.find();
  }

  findOne(id: number) {
    return this.foodRecipeRepository.findOneBy({ id });
  }

  update(id: number, updateFoodRecipeDto: UpdateFoodRecipeDto) {
    return this.foodRecipeRepository.save({
      id, ...updateFoodRecipeDto
    });
  }

  remove(id: number) {
    return this.foodRecipeRepository.delete({ id });
  }
}
