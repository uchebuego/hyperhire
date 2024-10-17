import { MigrationInterface, QueryRunner } from "typeorm";

export class Pt1729179658889 implements MigrationInterface {
    name = 'Pt1729179658889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "chain"`);
        await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "price" ADD "price" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "price" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price" ADD "chain" character varying NOT NULL`);
    }

}
