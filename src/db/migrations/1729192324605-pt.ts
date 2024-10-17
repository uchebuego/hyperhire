import { MigrationInterface, QueryRunner } from "typeorm";

export class Pt1729192324605 implements MigrationInterface {
    name = 'Pt1729192324605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "alert" ("id" SERIAL NOT NULL, "targetPrice" numeric NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "isTriggered" boolean NOT NULL DEFAULT false, "assetId" integer, CONSTRAINT "PK_ad91cad659a3536465d564a4b2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "alert" ADD CONSTRAINT "FK_a1c266921a94596c972c11b1ed2" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alert" DROP CONSTRAINT "FK_a1c266921a94596c972c11b1ed2"`);
        await queryRunner.query(`DROP TABLE "alert"`);
    }

}
