import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { applyQuery } from 'typeorm-extension';
import { CreateFoodRecipeDto, CreateFoodRecipeDtoResponse } from './dto/create-food-recipe.dto';
import { ResponseFoodRecipeDto, toResponseFoodRecipeDto } from './dto/response-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { FoodRecipeEntity } from './entities/food-recipe.entity';

@Injectable()
export class FoodRecipesService {
  readonly alias = 'foodRecipe';

  private readonly logger = new Logger(FoodRecipesService.name);

  constructor(
    @InjectRepository(FoodRecipeEntity)
    private readonly repository: Repository<FoodRecipeEntity>,
  ) {}

  private queryBuilder() {
    return this.repository
      .createQueryBuilder('foodRecipe')
      .innerJoinAndSelect('foodRecipe.difficulty', 'difficulty')
      .orderBy('foodRecipe.name', 'DESC');
  }

  async search(keyword: string, options: IPaginationOptions) {
    const builder = this.queryBuilder();
    if (keyword) {
      builder.where('foodRecipe.name like :name ', { name: `%${keyword}%` });
    }
    const paging = await paginate<FoodRecipeEntity>(builder, options);
    return { total: paging.meta.totalItems, results: paging.items }
  }

  async create(createFoodRecipeDto: CreateFoodRecipeDto): Promise<CreateFoodRecipeDtoResponse> {
    const result = await this.repository.save({
      ...createFoodRecipeDto,
      userId: -1,
    });

    return { id: result.id };
  }

  async findAll(): Promise<ResponseFoodRecipeDto[]> {
    const results = await this.repository
      .createQueryBuilder('foodRecipe')
      .innerJoin('foodRecipe.difficulty', 'difficulty')
      .select(['foodRecipe', 'difficulty'])
      .getMany();
    return results.map(toResponseFoodRecipeDto);
  }

  findOne(id: number) {
    const builder = this.queryBuilder();
    builder.where('foodRecipe.id = :id ', { id });
    return builder.getOne();
  }

  update(id: number, updateFoodRecipeDto: UpdateFoodRecipeDto) {
    return this.repository.save({ id, ...updateFoodRecipeDto });
  }

  remove(id: number) {
    return this.repository.delete({ id });
  }

}
