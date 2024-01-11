import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionBookTable1704910703718 implements MigrationInterface {
    name = 'AddDescriptionBookTable1704910703718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_favorites_books" ("usersId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_1921179f3143b72aa9c7d38eb0b" PRIMARY KEY ("usersId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1578d9430b10917637a2f3efb8" ON "users_favorites_books" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ed677125292d05df4e148049c" ON "users_favorites_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "books" ADD "description" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "books" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users_favorites_books" ADD CONSTRAINT "FK_1578d9430b10917637a2f3efb8f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_books" ADD CONSTRAINT "FK_4ed677125292d05df4e148049c4" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_books" DROP CONSTRAINT "FK_4ed677125292d05df4e148049c4"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_books" DROP CONSTRAINT "FK_1578d9430b10917637a2f3efb8f"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ed677125292d05df4e148049c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1578d9430b10917637a2f3efb8"`);
        await queryRunner.query(`DROP TABLE "users_favorites_books"`);
    }

}
