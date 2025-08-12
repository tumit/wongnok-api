import { INestApplication } from '@nestjs/common';
import { Test, TestingModule, TestingModuleOptions } from '@nestjs/testing';
import { AppModule } from '@root/src/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { matchers } from 'jest-json-schema';
import { fakeFoodRecipeEntity } from '@root/src/seeds/food-recipe.factory';
import { DataSource } from 'typeorm';

describe('FoodRecipesController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    expect.extend(matchers);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    dataSource = app.get(DataSource);
    await dataSource.query('BEGIN');
  });

  afterEach(async () => {
    await dataSource.query('ROLLBACK');
    await dataSource.query('BEGIN'); // start new transaction for next test
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
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
          'cookingDurationId',
        ],
        additionalProperties: false,
      },
    };

    return request(app.getHttpServer())
      .get('/food-recipes')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchSchema(schema);
      });
  });

  it('should create new food-recipe', () => {
    const { userId, ...dto } = { ...fakeFoodRecipeEntity() };

    const schema = {
      properties: {
        id: { type: 'number' },
      },
      request: ['id'],
    };

    return request(app.getHttpServer())
      .post('/food-recipes')
      .send(dto)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchSchema(schema);
      });
  });
});
