import { Test, TestingModule } from '@nestjs/testing';
import { CookingDurationsController } from './cooking-durations.controller';
import { CookingDurationsService } from './cooking-durations.service';
import { mock } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import { CookingDuration } from './entities/cooking-duration.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CookingDurationsController', () => {
  let controller: CookingDurationsController;
  const service = mock<CookingDurationsService>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookingDurationsController],
      providers: [{ provide: CookingDurationsService, useValue: service }],
    }).compile();

    controller = module.get<CookingDurationsController>(CookingDurationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list of cooking-duration', async () => {

    // arrange
    service.findAll.mockResolvedValue([{ id: 1, name: '5 - 10' }])

    // act
    const actual = await controller.findAll();

    // assert
    const expected = [{ id: 1, name: '5 - 10' }]
    expect(actual).toEqual(expected);

  })

});
