import { MigrationInterface, QueryRunner } from "typeorm";

export class InitCookingDurations1758809330648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const sql = `
        insert into cooking_durations(name) values('5 - 10');
        insert into cooking_durations(name) values('11 - 30');
        insert into cooking_durations(name) values('31 - 60');
        insert into cooking_durations(name) values('61+');
        `
        await queryRunner.query(sql)        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const sql = `
        delete from cooking_durations;;
        alter sequence cooking_durations_id_seq restart;
        update cooking_durations set id = DEFAULT;
        `
        await queryRunner.query(sql)        
    }

}
