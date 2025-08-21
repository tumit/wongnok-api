// food-recipes.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';

import {
  foodRecipeSchema,
  foodRecipeSchemas,
  testCreateFoodRecipeDto,
  testUpdateFoodRecipeDto,
} from './helper/food-recipes.helper';
import { AppModule } from '@app/app.module';

describe('FoodRecipeController (e2e)', () => {
  let app: INestApplication<App>;

  const url = '/food-recipes';

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/food-recipes (GET)', () => {
    return request(app.getHttpServer())
      .get(url)
      .expect(200)
      .expect((res) => {
        expect(foodRecipeSchemas.safeParse(res.body).success).toBe(true);
      });
  });

  it('/food-recipes/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`${url}/2`)
      .expect(200)
      .expect((res) => {
        expect(foodRecipeSchema.safeParse(res.body).success).toBe(true);
      });
  });

  it('/food-recipes/ (POST)', () => {
    return request(app.getHttpServer())
      .post(url)
      .send(testCreateFoodRecipeDto())
      .expect(201)
      .expect((res) => {
        expect(foodRecipeSchema.safeParse(res.body).success).toBe(true);
      });
  });

  it('/food-recipes/:id (PATCH)', async () => {
    const created = await request(app.getHttpServer())
      .post(url)
      .send(testCreateFoodRecipeDto())
      .expect(201);

    return request(app.getHttpServer())
      .patch(`${url}/${created.body.id}`)
      .send(testUpdateFoodRecipeDto())
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          ...testUpdateFoodRecipeDto(),
          id: created.body.id,
        });
      });
  });

  it('/food-recipes/:id (DELETE)', async () => {
    const created = await request(app.getHttpServer())
      .post(url)
      .send(testCreateFoodRecipeDto())
      .expect(201);

    return request(app.getHttpServer())
      .delete(`${url}/${created.body.id}`)
      .expect(200)
      .expect((res) => {
        console.log('res.body', res.body)
      });
  });
});
