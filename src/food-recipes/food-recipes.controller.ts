import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';

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
  update(@Param('id') id: string, @Body() updateFoodRecipeDto: UpdateFoodRecipeDto) {
    return this.foodRecipesService.update(+id, updateFoodRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodRecipesService.remove(+id);
  }
}
