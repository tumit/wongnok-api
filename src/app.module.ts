import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodRecipesModule } from './food-recipes/food-recipes.module';

@Module({
  imports: [FoodRecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
