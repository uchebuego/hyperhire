import { MigrationInterface, QueryRunner } from "typeorm";

export class Pt1729179871572 implements MigrationInterface {
    name = 'Pt1729179871572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price" ADD "assetId" integer`);
        await queryRunner.query(`ALTER TABLE "price" ADD CONSTRAINT "FK_26a8eee605536aaa034c4e7555a" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price" DROP CONSTRAINT "FK_26a8eee605536aaa034c4e7555a"`);
        await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "assetId"`);
    }

}
