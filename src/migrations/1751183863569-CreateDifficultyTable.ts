import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1751183863569 implements MigrationInterface {
    name = 'Init1751183863569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "difficulties" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4c3dd46c9ed9b426d0307e45b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX idx_difficulties_name ON difficulties(name);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "difficulties"`);
    }

}
