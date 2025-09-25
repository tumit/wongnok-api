import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758808814094 implements MigrationInterface {
    name = 'Init1758808814094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying, "role" character varying NOT NULL DEFAULT 'USER', "keycloak_id" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97b5061278a40c1dead71c1b889" UNIQUE ("keycloak_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "difficulties" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4c3dd46c9ed9b426d0307e45b3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cooking_durations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bbf036253e9b8541db41083c9aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "food_recipes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "ingredient" character varying NOT NULL, "instruction" character varying NOT NULL, "image_url" character varying, "avgRating" double precision NOT NULL DEFAULT '0', "ratingCount" integer NOT NULL DEFAULT '0', "difficulty_id" integer, "cooking_duration_id" integer, "username" character varying, CONSTRAINT "PK_d44deb7b1c53965cb5cb044295a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "score" integer NOT NULL, "food_recipe_id" integer NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_0bd6d5fbc46a4143af66b50b5bc" UNIQUE ("username", "food_recipe_id"), CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD CONSTRAINT "FK_183616c86b3c19655382902083b" FOREIGN KEY ("difficulty_id") REFERENCES "difficulties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD CONSTRAINT "FK_da14589430795f0c2cd10e8afef" FOREIGN KEY ("cooking_duration_id") REFERENCES "cooking_durations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_recipes" ADD CONSTRAINT "FK_b77b8d1ad4ea4cddbf323312222" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_57e1f2c181ccdbd8c4a409c229c" FOREIGN KEY ("food_recipe_id") REFERENCES "food_recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_5306a1ba1c2cc8ede16b2a347de" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_5306a1ba1c2cc8ede16b2a347de"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_57e1f2c181ccdbd8c4a409c229c"`);
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP CONSTRAINT "FK_b77b8d1ad4ea4cddbf323312222"`);
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP CONSTRAINT "FK_da14589430795f0c2cd10e8afef"`);
        await queryRunner.query(`ALTER TABLE "food_recipes" DROP CONSTRAINT "FK_183616c86b3c19655382902083b"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`DROP TABLE "food_recipes"`);
        await queryRunner.query(`DROP TABLE "cooking_durations"`);
        await queryRunner.query(`DROP TABLE "difficulties"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
