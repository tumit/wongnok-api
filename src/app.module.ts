import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      })
    }),
    DifficultiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
