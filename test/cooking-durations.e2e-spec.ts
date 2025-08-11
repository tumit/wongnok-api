// import supertest

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@root/src/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('CookingDurationsController (e2)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const opts = { imports: [AppModule] };
    const moduleFixture = await Test.createTestingModule(opts).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cooking-durations (GET)', () => {
    const expected = [
      { id: 1, name: '5 - 10' },
      { id: 2, name: '11 - 30' },
      { id: 3, name: '31 - 60' },
      { id: 4, name: '60+' },
    ];
    return request(app.getHttpServer())
      .get('/cooking-durations')
      .expect(200)
      .expect((res) => expect(res.body).toEqual(expected));
  });
});
