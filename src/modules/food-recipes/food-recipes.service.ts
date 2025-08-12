import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Difficulty } from '../difficulties/entities/difficulty.entity';
import {
  CreateFoodRecipeDto,
  CreateFoodRecipeDtoResponse,
} from './dto/create-food-recipe.dto';
import {
  ResponseFoodRecipeDto,
  toResponseFoodRecipeDto,
} from './dto/response-food-recipe.dto';
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
    const builder = this.repository.createQueryBuilder('foodRecipe');

    if (name) {
      builder.where('foodRecipe.name like :name ', { name: `%${name}%` });
    }

    if (sort) {
      const order = sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      builder.orderBy('foodRecipe.name', order);
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

  async findAll(): Promise<ResponseFoodRecipeDto[]> {
    // return this.repository.find({ relations: ['difficulty'] });
    const results = await this.repository
      .createQueryBuilder('foodRecipe')
      .innerJoin('foodRecipe.difficulty', 'difficulty')
      .select(['foodRecipe', 'difficulty'])
      .getMany();
    return results.map(toResponseFoodRecipeDto);
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
