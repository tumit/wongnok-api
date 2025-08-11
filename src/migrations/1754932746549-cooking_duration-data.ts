import { MigrationInterface, QueryRunner } from "typeorm";

export class CookingDurationData1754932746549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "cooking_duration" ("name") VALUES ('5 - 10'), ('11 - 30'), ('31 - 60'), ('60+')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "cooking_duration" WHERE "name" IN ('5 - 10', '11 - 30', '31 - 60', '60+');`);
    }

}
