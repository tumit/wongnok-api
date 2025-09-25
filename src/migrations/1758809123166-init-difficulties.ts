import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDifficulties1758809123166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const sql = `
        insert into difficulties(name) values('Easy');
        insert into difficulties(name) values('Medium');
        insert into difficulties(name) values('Hard');
        `
        await queryRunner.query(sql)        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const sql = `
        delete from difficulties where name ='Easy';
        delete from difficulties where name ='Medium';
        delete from difficulties where name ='Hard';
        alter sequence difficulties_id_seq restart;
        update difficulties set id = DEFAULT;
        `
        await queryRunner.query(sql)        
    }

}
