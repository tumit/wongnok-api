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
  private readonly logger = new Logger(FoodRecipesService.name);

  constructor(
    @InjectRepository(FoodRecipeEntity)
    private readonly repository: Repository<FoodRecipeEntity>,
  ) {}

  search(keyword: string, options: IPaginationOptions) {
    const builder = this.repository
      .createQueryBuilder('foodRecipe')
      .innerJoinAndSelect('foodRecipe.difficulty', 'difficulty')
      .orderBy('foodRecipe.name', 'DESC');

    if (keyword) {
      builder.where('foodRecipe.name like :name ', { name: `%${keyword}%` });
    }

    return paginate<FoodRecipeEntity>(builder, options);
  }

  async create(createFoodRecipeDto: CreateFoodRecipeDto): Promise<CreateFoodRecipeDtoResponse> {
    const result = await this.repository.save({
      ...createFoodRecipeDto,
      userId: -1,
    });

    return { id: result.id };
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
    return ;
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
