import { Injectable } from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-difficulty.dto';
import { UpdateDifficultyDto } from './dto/update-difficulty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DifficultiesService {
  constructor(
    @InjectRepository(Difficulty)
    private repository: Repository<Difficulty>,
  ) {}

  create(createDifficultyDto: CreateDifficultyDto): Promise<Difficulty | null> {
    return this.repository.save(createDifficultyDto);
  }
  findAll() {
    return `This action returns all difficulties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} difficulty`;
  }

  update(id: number, updateDifficultyDto: UpdateDifficultyDto) {
    return `This action updates a #${id} difficulty`;
  }

  remove(id: number) {
    return `This action removes a #${id} difficulty`;
  }
}
