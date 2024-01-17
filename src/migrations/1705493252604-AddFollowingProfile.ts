import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFollowingProfile1705493252604 implements MigrationInterface {
    name = 'AddFollowingProfile1705493252604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "bookcover" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "bookcover" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "follows"`);
    }

}
