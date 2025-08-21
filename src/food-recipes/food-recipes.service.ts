// food-recipes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { FoodRecipe } from './entities/food-recipe.entity';

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

    // return this.foodRecipeRepository.save({ id, ...updateFoodRecipeDto })
    return this.foodRecipeRepository
      .findOneByOrFail({ id })
      .then(() => this.foodRecipeRepository.save({ id, ...updateFoodRecipeDto }))
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`);
      });
  }

  remove(id: number) {
    return this.foodRecipeRepository.delete({ id });
  }
}
