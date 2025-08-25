// food-recipes.controller.ts
import { LoggedInUser as LoggedInUser } from '@app/auth/decorators/logged-in-user.decorator';
import { LoggedInGuard } from '@app/auth/guards/logged-in.guard';
import { IdParamDto } from '@app/common/dto/id-param.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { FoodRecipesService } from './food-recipes.service';
import { RatingDto } from './dto/rating.dto';
import { PagingDto } from '@app/common/dto/paging.dto';

@Controller('food-recipes')
export class FoodRecipesController {
  constructor(private readonly foodRecipesService: FoodRecipesService) {}

  @Post()
  @UseGuards(LoggedInGuard)
  create(
    @Body() createFoodRecipeDto: CreateFoodRecipeDto,
    @LoggedInUser('id') userId: number,
  ) {
    return this.foodRecipesService.create(createFoodRecipeDto, userId);
  }

  @Get('search')
  search(@Query() paging: PagingDto) {
    console.log(paging)
    return this.foodRecipesService.search(paging);
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
  @UseGuards(LoggedInGuard)
  update(
    @Param() param: IdParamDto,
    @Body() updateFoodRecipeDto: UpdateFoodRecipeDto,
    @LoggedInUser('id') userId: number,
  ) {
    return this.foodRecipesService.update(
      param.id,
      updateFoodRecipeDto,
      userId,
    );
  }

  @Delete(':id')
  remove(@Param() param: IdParamDto) {
    return this.foodRecipesService.remove(param.id);
  }

  @UseGuards(LoggedInGuard)
  @Put(':id/ratings')
  rating(
    @Param() param: IdParamDto,
    @Body() ratingDto: RatingDto,
    @LoggedInUser('id') userId: number,
  ) {
    return this.foodRecipesService.rate(
      param.id,
      ratingDto,
      userId,
    );
  }
}
