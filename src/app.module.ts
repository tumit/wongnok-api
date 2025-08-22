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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    DifficultiesModule,
    CookingDurationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    },
    AppService,
  ],
})
export class AppModule {}
