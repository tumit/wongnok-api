import { INestApplication } from '@nestjs/common';
import { Test, TestingModule, TestingModuleOptions } from '@nestjs/testing';
import { AppModule } from '@root/src/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { matchers } from 'jest-json-schema';

describe('FoodRecipesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    expect.extend(matchers);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/food-recipes (GET)', async () => {
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
          ingredient: { type: 'string' },
          instruction: { type: 'string' },
          cookingDurationId: { type: 'number' },
          imageUrl: { type: 'string' },
          difficulty: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
            required: ['id', 'name'],
            additionalProperties: false,
          },
        },
        required: [
          'id',
          'name',
          'description',
          'ingredient',
          'instruction',
          'imageUrl',
          'difficulty',
          'cookingDurationId'
        ],
        additionalProperties: false,
      },
    };

    return request(app.getHttpServer())
      .get('/food-recipes')
      .expect(200)
      .expect(({ body }) => {
        console.log(body);
        expect(body).toMatchSchema(schema);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
