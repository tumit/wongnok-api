import { Module } from '@nestjs/common';
import { FoodRecipesService } from './food-recipes.service';
import { FoodRecipesController } from './food-recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodRecipeEntity } from './entities/food-recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodRecipeEntity])],
  controllers: [FoodRecipesController],
  providers: [FoodRecipesService],
})
export class FoodRecipesModule {}
