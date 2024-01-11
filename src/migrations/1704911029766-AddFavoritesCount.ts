import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesCount1704911029766 implements MigrationInterface {
    name = 'AddFavoritesCount1704911029766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "favoritesCount"`);
    }

}
