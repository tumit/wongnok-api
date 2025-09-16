import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DifficultiesModule } from './difficulties/difficulties.module';

@Module({
  imports: [DifficultiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
