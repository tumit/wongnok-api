import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './modules/difficulties/difficulties.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './data-source';
import { CookingDurationsModule } from './modules/cooking-durations/cooking-durations.module';
import { FoodRecipesModule } from './modules/food-recipes/food-recipes.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            // get current DATABASE_URL
            const databaseUrl = process.env.DATABASE_URL;
            if (!databaseUrl) throw new Error('DATABASE_URL not set');
            return {
              ...dataSourceOpts,
              url: databaseUrl,
            };
          },
        }),
        DifficultiesModule,
        FoodRecipesModule,
        CookingDurationsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    };
  }
}
