import { MigrationInterface, QueryRunner } from "typeorm";

export class createCustodyEntity1702177013362 implements MigrationInterface {
    name = 'createCustodyEntity1702177013362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "custody" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "averagePrice" numeric(20,2) NOT NULL, "buyQuantity" integer NOT NULL, "buyPrice" numeric(20,2) NOT NULL, "cratedAt" date NOT NULL DEFAULT now(), "stock_id" character varying(6), CONSTRAINT "PK_08dd86c9823d9e0440890b05c27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "custody" ADD CONSTRAINT "FK_1903032f671dbfe7d129d6500e2" FOREIGN KEY ("stock_id") REFERENCES "stock"("symbol") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "custody" DROP CONSTRAINT "FK_1903032f671dbfe7d129d6500e2"`);
        await queryRunner.query(`DROP TABLE "custody"`);
    }

}
