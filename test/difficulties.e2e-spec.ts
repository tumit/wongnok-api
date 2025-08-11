import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('DifficultiesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/difficulties (GET)', () => {

  const schema = {
    properties: {
      hello: { type: 'string' },
    },
    required: ['hello'],
  };

    return request(app.getHttpServer())
      .get('/difficulties')
      .expect(200, [{"id":1,"name":"Easy"},{"id":2,"name":"Medium"},{"id":3,"name":"Hard"}]);
  });
});
