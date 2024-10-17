import { MigrationInterface, QueryRunner } from "typeorm";

export class Pt1729181630906 implements MigrationInterface {
    name = 'Pt1729181630906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" ADD "symbol" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset" DROP COLUMN "symbol"`);
    }

}
