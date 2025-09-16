import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DifficultiesService {

  constructor(
    @InjectEntityManager() 
    private entityManager: EntityManager
  ) { }

  findAll() {
    return this.entityManager.query(`select * from difficulties`);
  }

}
