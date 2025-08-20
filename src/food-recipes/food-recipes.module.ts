import { Module } from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { FoodRecipesController } from './food-recipes.controller';

@Module({
  controllers: [FoodRecipesController],
  providers: [FoodRecipesService],
})
export class FoodRecipesModule {}
