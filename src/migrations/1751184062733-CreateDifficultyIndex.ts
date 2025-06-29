import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDifficultyIndex1751184062733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX idx_difficulties_name ON difficulties(name);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX idx_difficulties_name`);
    }

}
