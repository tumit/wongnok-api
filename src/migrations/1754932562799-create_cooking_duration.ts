import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCookingDuration1754932562799 implements MigrationInterface {
    name = 'CreateCookingDuration1754932562799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cooking_duration" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6b266aa3371fe20998a85f9bf04" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cooking_duration"`);
    }

}
