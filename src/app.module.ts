import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { CookingDurationsModule } from './cooking-durations/cooking-durations.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      })
    }),
    DifficultiesModule,
    CookingDurationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
