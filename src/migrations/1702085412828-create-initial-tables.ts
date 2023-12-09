import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInitialTables1702085412828 implements MigrationInterface {
  name = 'createInitialTables1702085412828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "business_summary" ("id" SERIAL NOT NULL, "debentures" numeric(20,2) NOT NULL, "sellInCash" numeric(20,2) NOT NULL, "buyInCash" numeric(20,2) NOT NULL, "optionsBuy" numeric(20,2) NOT NULL, "optionsSell" numeric(20,2) NOT NULL, "termOptions" numeric(20,2) NOT NULL, "federalSecurities" numeric(20,2) NOT NULL, "operationValues" numeric(20,2) NOT NULL, CONSTRAINT "PK_bc3de17150db24dc9f698ad485e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clearing" ("id" SERIAL NOT NULL, "operationsNetValue" integer NOT NULL, "settlementFee" numeric(20,2) NOT NULL, "registryFee" numeric(20,2) NOT NULL, "totalCblc" numeric(20,2) NOT NULL, CONSTRAINT "PK_215a3be0f98a0a2ff5c84728c6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exchange" ("id" SERIAL NOT NULL, "termOrOptionsFee" numeric(20,2) NOT NULL, "anaFee" numeric(20,2) NOT NULL, "fees" numeric(20,2) NOT NULL, "total" numeric(20,2) NOT NULL, CONSTRAINT "PK_cbd4568fcb476b57cebd8239895" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "operational_costs" ("id" SERIAL NOT NULL, "operationalFee" numeric(20,2) NOT NULL, "execution" numeric(20,2) NOT NULL, "custody" numeric(20,2) NOT NULL, "taxes" numeric(20,2) NOT NULL, "irrf" numeric(20,2) NOT NULL, "others" numeric(20,2) NOT NULL, "totalCosts" numeric(20,2) NOT NULL, CONSTRAINT "PK_f5c663917dac6b252994c2c00a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."financial_summary_netdebitorcredit_enum" AS ENUM('DEBIT', 'CREDIT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "financial_summary" ("id" SERIAL NOT NULL, "netDate" date NOT NULL, "netTotalValue" numeric(20,2) NOT NULL, "netDebitOrCredit" "public"."financial_summary_netdebitorcredit_enum" NOT NULL, "clearingId" integer, "exchangeId" integer, "operationalCostsId" integer, CONSTRAINT "REL_dc143ebf074d7f6bbe353ce79d" UNIQUE ("clearingId"), CONSTRAINT "REL_f8709bb8f05d59ae48e37d51a4" UNIQUE ("exchangeId"), CONSTRAINT "REL_f8f9cfe5c74915c43efcef8647" UNIQUE ("operationalCostsId"), CONSTRAINT "PK_e6b8661dfc5a75d7b4d829cfa30" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "general_information" ("id" SERIAL NOT NULL, "brokerageOrderNumber" integer NOT NULL, "tradingFlorDate" date NOT NULL, "clientId" character varying NOT NULL, CONSTRAINT "PK_6328cd3dae937d4c0e02ca563fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "brokerage_order" ("id" SERIAL NOT NULL, "generalInformationId" integer, "businessSummaryId" integer, "financialSummaryId" integer, CONSTRAINT "REL_10a426e32ceb2fd89be0bda5f5" UNIQUE ("generalInformationId"), CONSTRAINT "REL_12b092bae9cb23a5636f68658d" UNIQUE ("businessSummaryId"), CONSTRAINT "REL_d42bfdfd8ee0fc65f0587571b5" UNIQUE ("financialSummaryId"), CONSTRAINT "PK_30689107c79424490c327babb52" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock" ("symbol" character varying(6) NOT NULL, "specification" character varying NOT NULL, CONSTRAINT "PK_8216f0ad859c53c0706e1e1f05f" PRIMARY KEY ("symbol"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_market_enum" AS ENUM('BOVESPA')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_buyorsell_enum" AS ENUM('BUY', 'SELL')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_markettype_enum" AS ENUM('VISTA')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_debitorcredit_enum" AS ENUM('DEBIT', 'CREDIT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "market" "public"."order_market_enum" NOT NULL DEFAULT 'BOVESPA', "buyOrSell" "public"."order_buyorsell_enum" NOT NULL, "marketType" "public"."order_markettype_enum" NOT NULL DEFAULT 'VISTA', "quantity" integer NOT NULL, "price" numeric(20,2) NOT NULL, "total" numeric(20,2) NOT NULL, "debitOrCredit" "public"."order_debitorcredit_enum" NOT NULL, "stock_id" character varying(6), "brokerage_order_id" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_summary" ADD CONSTRAINT "FK_dc143ebf074d7f6bbe353ce79d3" FOREIGN KEY ("clearingId") REFERENCES "clearing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_summary" ADD CONSTRAINT "FK_f8709bb8f05d59ae48e37d51a4d" FOREIGN KEY ("exchangeId") REFERENCES "exchange"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_summary" ADD CONSTRAINT "FK_f8f9cfe5c74915c43efcef86478" FOREIGN KEY ("operationalCostsId") REFERENCES "operational_costs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brokerage_order" ADD CONSTRAINT "FK_10a426e32ceb2fd89be0bda5f53" FOREIGN KEY ("generalInformationId") REFERENCES "general_information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brokerage_order" ADD CONSTRAINT "FK_12b092bae9cb23a5636f68658d0" FOREIGN KEY ("businessSummaryId") REFERENCES "business_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "brokerage_order" ADD CONSTRAINT "FK_d42bfdfd8ee0fc65f0587571b55" FOREIGN KEY ("financialSummaryId") REFERENCES "financial_summary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_259c5b9be45d406a02f86543c47" FOREIGN KEY ("stock_id") REFERENCES "stock"("symbol") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_474dfa8efeb23f2690d136105f6" FOREIGN KEY ("brokerage_order_id") REFERENCES "brokerage_order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_474dfa8efeb23f2690d136105f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_259c5b9be45d406a02f86543c47"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brokerage_order" DROP CONSTRAINT "FK_d42bfdfd8ee0fc65f0587571b55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brokerage_order" DROP CONSTRAINT "FK_12b092bae9cb23a5636f68658d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "brokerage_order" DROP CONSTRAINT "FK_10a426e32ceb2fd89be0bda5f53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_summary" DROP CONSTRAINT "FK_f8f9cfe5c74915c43efcef86478"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_summary" DROP CONSTRAINT "FK_f8709bb8f05d59ae48e37d51a4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "financial_summary" DROP CONSTRAINT "FK_dc143ebf074d7f6bbe353ce79d3"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_debitorcredit_enum"`);
    await queryRunner.query(`DROP TYPE "public"."order_markettype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."order_buyorsell_enum"`);
    await queryRunner.query(`DROP TYPE "public"."order_market_enum"`);
    await queryRunner.query(`DROP TABLE "stock"`);
    await queryRunner.query(`DROP TABLE "brokerage_order"`);
    await queryRunner.query(`DROP TABLE "general_information"`);
    await queryRunner.query(`DROP TABLE "financial_summary"`);
    await queryRunner.query(
      `DROP TYPE "public"."financial_summary_netdebitorcredit_enum"`,
    );
    await queryRunner.query(`DROP TABLE "operational_costs"`);
    await queryRunner.query(`DROP TABLE "exchange"`);
    await queryRunner.query(`DROP TABLE "clearing"`);
    await queryRunner.query(`DROP TABLE "business_summary"`);
  }
}
