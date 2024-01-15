import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCoverBook1705347426180 implements MigrationInterface {
  name = 'AddCoverBook1705347426180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" ADD "bookcover" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "bookcover"`);
  }
}
