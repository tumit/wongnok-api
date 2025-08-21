// food-recipes.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('FoodRecipeController (e2e)', () => {

  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/food-recipes (GET)', () => {
    return request(app.getHttpServer())
      .get('/food-recipes')
      .expect(200)
      .expect((res) => {
        console.log('res.body', res.body)
        expect(res.body).toBeTruthy()
      });
  })

})