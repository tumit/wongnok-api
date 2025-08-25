// food-recipes.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { RatingDto } from './dto/rating.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { Rating } from './entities/rating.entity';
import { FoodRecipeRepository } from './food-recipes.repository';

@Injectable()
export class FoodRecipesService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
  ) {}

  get repository() {
    return FoodRecipeRepository(this.dataSource)
  }

  create(createFoodRecipeDto: CreateFoodRecipeDto, userId: number) {
    const newEntity = { ...createFoodRecipeDto, user: { id: userId } };
    return this.repository.save(newEntity);
  }

  async search(query: any) {
    console.log('query', query)
    return this.repository.search(query)
  }

  async findAll() {
    return this.repository.findWithAvg()
  }

  async findOne(id: number) {
    return this.repository.findOneWithAvg(id);
  }

  async update(
    id: number,
    updateFoodRecipeDto: UpdateFoodRecipeDto,
    userId: number,
    isInternal = false,
  ) {
    if (isInternal) {
      return this.updateInternal(id, updateFoodRecipeDto, userId);
    }

    return this.repository
      .findOneByOrFail({ id, user: { id: userId } })
      .then(() => this.repository.save({ id, ...updateFoodRecipeDto }))
      .catch(() => {
        throw new NotFoundException(`Not found: id=${id}`);
      });
  }

  async updateInternal(
    id: number,
    updateFoodRecipeDto: UpdateFoodRecipeDto,
    userId: number,
  ) {
    return this.repository
      .findOne({ where: { id }, relations: ['user'] })
      .then((recipe) => {
        if (!recipe) {
          throw new NotFoundException(`Not found: id=${id}`);
        }
        if (recipe.user.id !== userId) {
          throw new ForbiddenException(`You cannot update recipe id=${id}`);
        }
        return this.repository.save({ id, ...updateFoodRecipeDto });
      });
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }

  async rate(foodRecipeId: number, ratingDto: RatingDto, userId: number) {
    const keys = { foodRecipe: { id: foodRecipeId }, user: { id: userId } };
    await this.ratingRepository.upsert(
      { ...ratingDto, ...keys },
      { conflictPaths: ['foodRecipe', 'user'] },
    );

    return this.ratingRepository.findOne({
      where: keys,
    });
  }
}
