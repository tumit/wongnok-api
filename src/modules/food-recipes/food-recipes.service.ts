import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Difficulty } from '../difficulties/entities/difficulty.entity';
import {
  CreateFoodRecipeDto,
  CreateFoodRecipeDtoResponse,
} from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { FoodRecipeEntity } from './entities/food-recipe.entity';

@Injectable()
export class FoodRecipesService {
  private readonly logger = new Logger(FoodRecipesService.name);

  constructor(
    @InjectRepository(FoodRecipeEntity)
    private readonly repository: Repository<FoodRecipeEntity>,
  ) {}

  search(name: string, sort: string, options: IPaginationOptions) {
    const builder = this.repository.createQueryBuilder('food_recipes');

    if (name) {
      builder.where('food_recipes.name like :name ', { name: `%${name}%` });
    }

    if (sort) {
      const order = sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      builder.orderBy('food_recipes.name', order);
    }

    return paginate<FoodRecipeEntity>(builder, options);
  }

  create(
    createFoodRecipeDto: CreateFoodRecipeDto,
  ): Promise<CreateFoodRecipeDtoResponse> {
    const { difficultyId, ...dto } = { ...createFoodRecipeDto };
    return this.repository.save({
      ...dto,
      difficulty: { id: difficultyId } as Difficulty,
      userId: -1,
    });
  }

  findAll() {
    // return this.repository.find({ relations: ['difficulty'] });
    return this.repository
      .createQueryBuilder('foodRecipe')
      .innerJoin('foodRecipe.difficulty', 'difficulty')
      .select([
        'foodRecipe',
        'difficulty.id',
        'difficulty.name',
      ])
      .getMany();
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

  queryBuilder(alias: string) {
    return this.repository.createQueryBuilder(alias);
  }
}
