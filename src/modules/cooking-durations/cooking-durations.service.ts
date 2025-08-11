import { Injectable } from '@nestjs/common';
import { CreateCookingDurationDto } from './dto/create-cooking-duration.dto';
import { UpdateCookingDurationDto } from './dto/update-cooking-duration.dto';

@Injectable()
export class CookingDurationsService {
  create(createCookingDurationDto: CreateCookingDurationDto) {
    return 'This action adds a new cookingDuration';
  }

  findAll() {
    return [
      { id: 1, name: '5 - 10' },
      { id: 2, name: '11 - 30' },
      { id: 3, name: '31 - 60' },
      { id: 4, name: '60+' },
    ];
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
