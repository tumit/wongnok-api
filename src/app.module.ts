// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './datasource';
import { CookingDurationsModule } from './cooking-durations/cooking-durations.module';
import { UsersModule } from './users/users.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { FoodRecipesModule } from './food-recipes/food-recipes.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      useFactory: () => ({ secret: `${process.env.JWT_SECRET}` }),
    }),
    DifficultiesModule,
    CookingDurationsModule,
    UsersModule,
    FoodRecipesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
