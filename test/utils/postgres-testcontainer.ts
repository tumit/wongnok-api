import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';

export async function startPostgresContainer(): Promise<StartedPostgreSqlContainer> {
  const container = await new PostgreSqlContainer('postgres:16')
    .withDatabase('test_db')
    .withUsername('postgres')
    .withPassword('postgres')
    .start();

  return container;
}