import { Injectable } from '@nestjs/common';
import { CreateCookingDurationDto } from './dto/create-cooking-duration.dto';
import { UpdateCookingDurationDto } from './dto/update-cooking-duration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CookingDuration } from './entities/cooking-duration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CookingDurationsService {

  constructor(@InjectRepository(CookingDuration) private repository: Repository<CookingDuration>) {

  }

  create(createCookingDurationDto: CreateCookingDurationDto) {
    return 'This action adds a new cookingDuration';
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cookingDuration`;
  }

  update(id: number, updateCookingDurationDto: UpdateCookingDurationDto) {
    return `This action updates a #${id} cookingDuration`;
  }

  remove(id: number) {
    return `This action removes a #${id} cookingDuration`;
  }
}
