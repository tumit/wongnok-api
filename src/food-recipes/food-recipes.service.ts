import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodRecipesService {

  constructor(@InjectRepository(FoodRecipe) private repository: Repository<FoodRecipe>) { }

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

  async update(id: number, updateFoodRecipeDto: UpdateFoodRecipeDto, loggedInDto: LoggedInDto) {
    return this.repository.findOneByOrFail({ id, user: { username: loggedInDto.username } })
      .then(() => this.repository.save({ id, ...updateFoodRecipeDto }))
      .catch(() => {
        throw new NotFoundException(`Not found id=${id}`)
      });
  }

  async remove(id: number, loggedInDto: LoggedInDto) {
    return this.repository.findOneByOrFail({ id, user: { username: loggedInDto.username } })
      .then(() => this.repository.delete({ id }))
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`)
      });
  }
}
