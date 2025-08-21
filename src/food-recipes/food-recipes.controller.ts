// food-recipes.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { FoodRecipesService } from './food-recipes.service';
import { IdParamDto } from '../common/dto/id-param.dto';

@Controller('food-recipes')
export class FoodRecipesController {
  constructor(private readonly foodRecipesService: FoodRecipesService) {}

  @Post()
  create(@Body() createFoodRecipeDto: CreateFoodRecipeDto) {
    return this.foodRecipesService.create(createFoodRecipeDto);
  }

  @Get()
  findAll() {
    return this.foodRecipesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdParamDto) {
    return this.foodRecipesService.findOne(param.id);
  }

  @Patch(':id')
  update(
    @Param() param: IdParamDto,
    @Body() updateFoodRecipeDto: UpdateFoodRecipeDto,
  ) {
    return this.foodRecipesService.update(param.id, updateFoodRecipeDto);
  }

  @Delete(':id')
  remove(@Param() param: IdParamDto) {
    return this.foodRecipesService.remove(param.id);
  }
}
