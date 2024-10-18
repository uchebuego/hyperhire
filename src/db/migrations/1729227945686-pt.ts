import { MigrationInterface, QueryRunner } from "typeorm";

export class Pt1729227945686 implements MigrationInterface {
    name = 'Pt1729227945686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" ADD "refresh" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "refresh"`);
    }

}
