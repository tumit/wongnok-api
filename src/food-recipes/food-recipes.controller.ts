import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode, Put } from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { CreateFoodRecipeDto } from './dto/create-food-recipe.dto';
import { UpdateFoodRecipeDto } from './dto/update-food-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInDto } from '@app/auth/dto/logged-in.dto';
import { IdDto } from '@app/common/dto/id.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { RatingDto } from './dto/rating.dto';
import { RatingService } from './rating.service';

@Controller('food-recipes')
export class FoodRecipesController {
  constructor(
    private readonly foodRecipesService: FoodRecipesService,
    private readonly ratingService: RatingService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createFoodRecipeDto: CreateFoodRecipeDto, @Req() req: { user: LoggedInDto }) {
    return this.foodRecipesService.create(createFoodRecipeDto, req.user);
  }


  @Get()
  search(@Paginate() query: PaginateQuery) {
    return this.foodRecipesService.search(query);
  }

  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.foodRecipesService.findOne(idDto.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param() idDto: IdDto,
    @Body() updateFoodRecipeDto: UpdateFoodRecipeDto,
    @Req() req: { user: LoggedInDto }) {
    return this.foodRecipesService.update(idDto.id, updateFoodRecipeDto, req.user);
  }

  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param() idDto: IdDto, @Req() req: { user: LoggedInDto }) {
    return this.foodRecipesService.remove(idDto.id, req.user);
  }


  @UseGuards(AuthGuard('jwt'))
  @Put(":id/rating")
  rating(
    @Param() idDto: IdDto,
    @Body() ratingDto: RatingDto,
    @Req() req: { user: LoggedInDto }
  ) {
    return this.ratingService.rate(idDto.id, ratingDto, req.user);
  }

}
