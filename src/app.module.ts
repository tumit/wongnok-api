import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './modules/difficulties/difficulties.module';

import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { FoodRecipesModule } from './modules/food-recipes/food-recipes.module';
import { CookingDurationsModule } from './modules/cooking-durations/cooking-durations.module';
import dbConfig from './db/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, load: [dbConfig]
    }),
    DbModule,
    DifficultiesModule,
    FoodRecipesModule,
    CookingDurationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
