// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './difficulties/difficulties.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './datasource';
import { CookingDurationsModule } from './cooking-durations/cooking-durations.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
