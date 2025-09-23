import { Injectable } from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodRecipesService {

  constructor(@InjectRepository(FoodRecipe) private repository: Repository<FoodRecipe>) {}

  create(createFoodRecipeDto: CreateFoodRecipeDto, loggedInDto: LoggedInDto) {
    return this.repository.save({
      ...createFoodRecipeDto,
      user: { username: loggedInDto.username }
    });
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
