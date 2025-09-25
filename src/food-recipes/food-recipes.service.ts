import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateConfig, PaginateQuery } from 'nestjs-paginate';

export const paginateConfig: PaginateConfig<FoodRecipe> = {
  sortableColumns: ['name', 'avgRating', 'ratingCount'],
  searchableColumns: ['name', 'ingredient'],
};

@Injectable()
export class FoodRecipesService {

  constructor(@InjectRepository(FoodRecipe) private repository: Repository<FoodRecipe>) { }

  create(createFoodRecipeDto: CreateFoodRecipeDto, loggedInDto: LoggedInDto) {
    return this.repository.save({
      ...createFoodRecipeDto,
      user: { username: loggedInDto.username }
    });
  }

  private queryTemplate() {
    return this.repository
      .createQueryBuilder('food_recipe')
      .leftJoinAndSelect('food_recipe.difficulty', 'difficulty')
      .leftJoinAndSelect('food_recipe.cookingDuration', 'cookingDuration')
      .leftJoin('food_recipe.user', 'user')
      .addSelect('user.id')
      .addSelect('user.username')
      .addSelect('user.role');
  }

  async search(query: PaginateQuery) {
    const page = await paginate<FoodRecipe>(
      query,
      this.queryTemplate(),
      paginateConfig,
    );

    return {
      data: page.data,
      meta: page.meta,
    };
  }

  findOne(id: number) {
    return this.queryTemplate().where('food_recipe.id = :id', { id }).getOne();
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
