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
  update(
    @Param('id') id: string,
    @Body() updateFoodRecipeDto: UpdateFoodRecipeDto,
  ) {
    return this.foodRecipesService.update(+id, updateFoodRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodRecipesService.remove(+id);
  }
}
