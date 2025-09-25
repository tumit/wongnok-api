import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { CookingDurationsModule } from './cooking-durations/cooking-durations.module';
import { UsersModule } from './users/users.module';
import { APP_PIPE, NestApplication } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthModule } from './auth/auth.module';
import { ConfigifyModule } from '@itgorillaz/configify';
import { FoodRecipesModule } from './food-recipes/food-recipes.module';
import { LoginLoggerMiddleware } from './middlewares/login-logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === 'local', // sync only local
      })
    }),
    ConfigifyModule.forRootAsync(),
    DifficultiesModule,
    CookingDurationsModule,
    UsersModule,
    AuthModule,
    FoodRecipesModule
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginLoggerMiddleware).forRoutes(
      { path: '*auth/login', method: RequestMethod.POST },
      { path: '*keycloak/login', method: RequestMethod.GET },
    )
  }
}
