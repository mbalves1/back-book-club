import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugBookTable1705003221924 implements MigrationInterface {
    name = 'AddSlugBookTable1705003221924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "slug"`);
    }

}
