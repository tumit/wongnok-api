import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDifficulty1754852489709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "difficulties" ("name") VALUES ('Easy'), ('Medium'), ('Hard') ON CONFLICT DO NOTHING;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "difficulties" WHERE "name" IN ('Easy', 'Medium', 'Hard');`);
    }

}
