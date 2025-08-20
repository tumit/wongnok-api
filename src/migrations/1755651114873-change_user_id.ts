import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserId1755651114873 implements MigrationInterface {
    name = 'ChangeUserId1755651114873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD "user_id" character varying`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD CONSTRAINT "FK_5f347b5c8dace478f836abcf688" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP CONSTRAINT "FK_5f347b5c8dace478f836abcf688"`);
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD "user_id" integer NOT NULL`);
    }

}
