import { MigrationInterface, QueryRunner } from "typeorm";

export class Pt1729176660939 implements MigrationInterface {
    name = 'Pt1729176660939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price" ("id" SERIAL NOT NULL, "chain" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "chainId" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "price"`);
    }

}
