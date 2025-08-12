import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

export function mockSelectQueryBuilder<T extends ObjectLiteral>(): {
  repository: DeepMockProxy<Repository<T>>;
  queryBuilder: DeepMockProxy<SelectQueryBuilder<T>>;
} {
  const repository = mockDeep<Repository<T>>();
  const queryBuilder = mockDeep<SelectQueryBuilder<T>>();
  repository.createQueryBuilder.mockReturnValue(queryBuilder);
  queryBuilder.leftJoin.mockReturnValue(queryBuilder);
  queryBuilder.leftJoinAndSelect.mockReturnValue(queryBuilder);
  queryBuilder.innerJoin.mockReturnValue(queryBuilder);
  queryBuilder.innerJoinAndSelect.mockReturnValue(queryBuilder);
  queryBuilder.where.mockReturnValue(queryBuilder);
  queryBuilder.orderBy.mockReturnValue(queryBuilder);
  queryBuilder.select.mockReturnValue(queryBuilder);
  return { repository, queryBuilder };
}
