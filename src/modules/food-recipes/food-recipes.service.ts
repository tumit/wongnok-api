import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { FoodRecipeEntity } from './entities/food-recipe.entity';

@Injectable()
export class FoodRecipesService {
  private readonly logger = new Logger(FoodRecipesService.name);

  constructor(
    @InjectRepository(FoodRecipeEntity)
    private readonly repository: Repository<FoodRecipeEntity>,
  ) {}

  async search(name: string, sort: string, options: IPaginationOptions) {

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

  create(createFoodRecipeDto: CreateFoodRecipeDto) {
    return 'This action adds a new foodRecipe';
  }

  findAll() {
    return this.repository.find();
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

  async queryBuilder(alias: string) {
    return this.repository.createQueryBuilder(alias);
  }
}
