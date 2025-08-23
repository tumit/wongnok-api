// food-recipes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodRecipesService {

  constructor(@InjectRepository(FoodRecipe) private repository: Repository<FoodRecipe>){}

  create(createFoodRecipeDto: CreateFoodRecipeDto) {
    return this.repository.save(createFoodRecipeDto);
  }

  findAll() {
    return `This action returns all foodRecipes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodRecipe`;
  }

  async update(id: number, updateFoodRecipeDto: UpdateFoodRecipeDto) {
    return this.repository
      .findOneByOrFail({ id })
      .then(() => this.repository.save({ id, ...updateFoodRecipeDto }))
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`);
      });
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }
}
