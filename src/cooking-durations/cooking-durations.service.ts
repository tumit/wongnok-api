import { Injectable } from '@nestjs/common';
import { CreateCookingDurationDto } from './dto/create-cooking-duration.dto';
import { UpdateCookingDurationDto } from './dto/update-cooking-duration.dto';

@Injectable()
export class CookingDurationsService {
  create(createCookingDurationDto: CreateCookingDurationDto) {
    return 'This action adds a new cookingDuration';
  }

  findAll() {
    return `This action returns all cookingDurations`;
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
