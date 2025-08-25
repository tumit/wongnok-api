import {
  IPaginationOptions,
  paginateRaw
} from 'nestjs-typeorm-paginate';
import { DataSource } from 'typeorm';
import { FoodRecipe } from './entities/food-recipe.entity';

export const FoodRecipeRepository = (dataSource: DataSource) =>
  dataSource.getRepository(FoodRecipe).extend({
    templateQueryBuilder() {
      return (
        this.createQueryBuilder('recipe')
          .leftJoin('recipe.user', 'user')
          .leftJoin('recipe.difficulty', 'difficulty')
          .leftJoin('recipe.cookingDuration', 'cooking_duration')
          .leftJoin('ratings', 'rating', 'rating.food_recipe_id = recipe.id')
          // .select('recipe')
          .select('recipe.id', 'id')
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
          .orderBy('COALESCE(AVG(rating.score), 0)', 'DESC')
      );
    },

    async findOneWithAvg(id: number) {
      const result = await this.templateQueryBuilder()
        .where('recipe.id = :id', { id })
        .getRawOne();
      return toResponseDto(result);
    },

    async findWithAvg() {
      const result = await this.templateQueryBuilder().getRawMany();
      return result.map(toResponseDto);
    },

    async search(options: IPaginationOptions) {
      const qb = this.templateQueryBuilder();
      const { items, meta } = await paginateRaw(qb, options);
      return {
        data: items.map(toResponseDto),
        meta
      }
    },
  });

export const toResponseDto = (result: any) => {
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
};
