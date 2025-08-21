// app.module.ts
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { customZodError } from './common/validation/custom-zod-error';
import { dataSourceOpts } from './datasource';
import { FoodRecipesModule } from './food-recipes/food-recipes.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    FoodRecipesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: createZodValidationPipe({ createValidationException: customZodError }),
    },
    AppService,
  ],
})
export class AppModule {}
