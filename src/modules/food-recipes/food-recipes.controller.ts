import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { CreateFoodRecipeDto, CreateFoodRecipeDtoResponse } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';

@Controller('food-recipes')
export class FoodRecipesController {
  private readonly logger = new Logger(FoodRecipesController.name);

  constructor(private readonly foodRecipesService: FoodRecipesService) {}

  @Get('search')
  async search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('keyword') keyword: string,
  ) {
    console.log('page', page);
    console.log('limit', limit);
    return this.foodRecipesService.search(keyword, {
      page,
      limit,
    });
  }

  @Post()
  create(@Body() createFoodRecipeDto: CreateFoodRecipeDto): Promise<CreateFoodRecipeDtoResponse> {
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
