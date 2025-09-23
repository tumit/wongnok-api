import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';

@Controller('food-recipes')
export class FoodRecipesController {
  constructor(private readonly foodRecipesService: FoodRecipesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createFoodRecipeDto: CreateFoodRecipeDto, @Req() req: { user: LoggedInDto }) {
    return this.foodRecipesService.create(createFoodRecipeDto, req.user);
  }

  @Get()
  findAll() {
    return this.foodRecipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodRecipesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateFoodRecipeDto: UpdateFoodRecipeDto, 
    @Req() req: { user: LoggedInDto }) {
    return this.foodRecipesService.update(+id, updateFoodRecipeDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodRecipesService.remove(+id);
  }
}
