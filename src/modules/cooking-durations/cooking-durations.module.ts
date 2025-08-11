import { Module } from '@nestjs/common';
import { CookingDurationsService } from './cooking-durations.service';
import { CookingDurationsController } from './cooking-durations.controller';

@Module({
  controllers: [CookingDurationsController],
  providers: [CookingDurationsService],
})
export class CookingDurationsModule {}
