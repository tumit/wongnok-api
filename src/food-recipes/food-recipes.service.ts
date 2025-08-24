// food-recipes.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';
import { Repository } from 'typeorm';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { RatingDto } from './dto/rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class FoodRecipesService {
  constructor(
    @InjectRepository(FoodRecipe) private repository: Repository<FoodRecipe>,
    @InjectRepository(Rating) private ratingRepository: Repository<Rating>,
  ) {}

  create(createFoodRecipeDto: CreateFoodRecipeDto, userId: number) {
    const newEntity = { ...createFoodRecipeDto, user: { id: userId } };
    return this.repository.save(newEntity);
  }

  async findAll() {
    const result = await this.repository
      .createQueryBuilder('recipe')
      .leftJoin('recipe.user', 'user')
      .leftJoin('recipe.difficulty', 'difficulty')
      .leftJoin('recipe.cookingDuration', 'cooking_duration')
      .leftJoin('ratings', 'rating', 'rating.food_recipe_id = recipe.id')
      .select('recipe.id', 'id')
      .addSelect('recipe.id', 'id')
      .addSelect('recipe.name', 'name')
      .addSelect('recipe.description', 'description')
      .addSelect('recipe.ingredient', 'ingredient')
      .addSelect('recipe.instruction', 'instruction')
      .addSelect('recipe.imageUrl', 'imageUrl')
      .addSelect('user.id', 'user_id')
      .addSelect('user.username', 'user_username')
      .addSelect('difficulty.id', 'difficulty_id')
      .addSelect('difficulty.name', 'difficulty_name')
      .addSelect('cooking_duration.id', 'cooking_duration_id')
      .addSelect('cooking_duration.name', 'cooking_duration_name')
      .addSelect('COALESCE(AVG(rating.score), 0)', 'averageRating')
      .groupBy('recipe.id')
      .addGroupBy('user.id')
      .addGroupBy('user.username')
      .addGroupBy('difficulty.id')
      .addGroupBy('difficulty.name')
      .addGroupBy('cooking_duration.id')
      .addGroupBy('cooking_duration.name')
      .getRawMany();

    return result.map(this.toResponseDto);
  }

  async findOne(id: number) {
    // return this.repository
    //   .createQueryBuilder('frs')
    //   .innerJoinAndSelect('frs.user', 'user')
    //   .select(['frs', 'user.id', 'user.username'])
    //   .where('frs.id = :id', { id })
    //   .getRawOne();

    const result = await this.repository
      .createQueryBuilder('recipe')
      .leftJoin('recipe.user', 'user')
      .leftJoin('recipe.difficulty', 'difficulty')
      .leftJoin('recipe.cookingDuration', 'cooking_duration')
      .leftJoin('ratings', 'rating', 'rating.food_recipe_id = recipe.id')
      .select('recipe.id', 'id')
      .addSelect('recipe.id', 'id')
      .addSelect('recipe.name', 'name')
      .addSelect('recipe.description', 'description')
      .addSelect('recipe.ingredient', 'ingredient')
      .addSelect('recipe.instruction', 'instruction')
      .addSelect('recipe.imageUrl', 'imageUrl')
      .addSelect('user.id', 'user_id')
      .addSelect('user.username', 'user_username')
      .addSelect('difficulty.id', 'difficulty_id')
      .addSelect('difficulty.name', 'difficulty_name')
      .addSelect('cooking_duration.id', 'cooking_duration_id')
      .addSelect('cooking_duration.name', 'cooking_duration_name')
      .addSelect('COALESCE(AVG(rating.score), 0)', 'averageRating')
      .where('recipe.id = :id', { id })
      .groupBy('recipe.id')
      .addGroupBy('user.id')
      .addGroupBy('user.username')
      .addGroupBy('difficulty.id')
      .addGroupBy('difficulty.name')
      .addGroupBy('cooking_duration.id')
      .addGroupBy('cooking_duration.name')
      .getRawOne();

    return this.toResponseDto(result);
  }

  private toResponseDto(result: any): unknown {
    const {
      user_id,
      user_username,
      difficulty_id,
      difficulty_name,
      cooking_duration_id,
      cooking_duration_name,
      ...others
    } = { ...result };

    return {
      ...others,
      difficulty: {
        id: difficulty_id,
        name: difficulty_name,
      },
      cookingDuration: {
        id: cooking_duration_id,
        name: cooking_duration_name,
      },
      user: {
        id: user_id,
        username: user_username,
      },
      averageRating: parseFloat(result.averageRating),
    };
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
