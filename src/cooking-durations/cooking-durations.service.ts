// cooking-durations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CookingDuration } from './entities/cooking-duration.entity';

@Injectable()
export class CookingDurationsService {

  constructor(@InjectRepository(CookingDuration) private repository: Repository<CookingDuration>) {}

  findAll() {
    return this.repository.find();
  }
}
