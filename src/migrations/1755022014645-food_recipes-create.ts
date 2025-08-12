import { MigrationInterface, QueryRunner } from "typeorm";

export class FoodRecipesCreate1755022014645 implements MigrationInterface {
    name = 'FoodRecipesCreate1755022014645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_difficulties_name"`);
        await queryRunner.query(`CREATE TABLE "food_recipes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "ingredient" character varying NOT NULL, "instruction" character varying NOT NULL, "image_url" character varying NOT NULL, "cooking_duration_id" integer NOT NULL, "user_id" integer NOT NULL, "difficultyId" integer, CONSTRAINT "PK_d44deb7b1c53965cb5cb044295a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD CONSTRAINT "FK_2190f542fb620497fa249b25e39" FOREIGN KEY ("difficultyId") REFERENCES "difficulties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP CONSTRAINT "FK_2190f542fb620497fa249b25e39"`);
        await queryRunner.query(`DROP TABLE "food_recipes"`);
        await queryRunner.query(`CREATE INDEX "idx_difficulties_name" ON "difficulties" ("name") `);
    }

}
