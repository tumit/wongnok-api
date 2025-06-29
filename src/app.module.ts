import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './modules/difficulties/difficulties.module';

import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './db/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, load: [dbConfig]
    }),
    DbModule,
    DifficultiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
