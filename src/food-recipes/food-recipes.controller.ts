// food-recipes.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { IdParamDto } from '@app/common/dto/id-param.dto';

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
  findOne(@Param('id') id: string) {
    return this.foodRecipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() param: IdParamDto, @Body() updateFoodRecipeDto: UpdateFoodRecipeDto) {
    return this.foodRecipesService.update(param.id, updateFoodRecipeDto);
  }

  @Delete(':id')
  remove(@Param() param: IdParamDto) {
    return this.foodRecipesService.remove(param.id);
  }
}
