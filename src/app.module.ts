import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './modules/difficulties/difficulties.module';

import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    DifficultiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
