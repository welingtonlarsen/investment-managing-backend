import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInitialTables1696120696429 implements MigrationInterface {
  name = 'createInitialTables1696120696429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`clearing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`operationsNetValue\` int NOT NULL, \`settlementFee\` decimal(20,2) NOT NULL, \`registryFee\` decimal(20,2) NOT NULL, \`totalCblc\` decimal(20,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`exchange\` (\`id\` int NOT NULL AUTO_INCREMENT, \`termOrOptionsFee\` decimal(20,2) NOT NULL, \`anaFee\` decimal(20,2) NOT NULL, \`fees\` decimal(20,2) NOT NULL, \`total\` decimal(20,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`operational_costs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`operationalFee\` decimal(20,2) NOT NULL, \`execution\` decimal(20,2) NOT NULL, \`custody\` decimal(20,2) NOT NULL, \`taxes\` decimal(20,2) NOT NULL, \`irrf\` decimal(20,2) NOT NULL, \`others\` decimal(20,2) NOT NULL, \`totalCosts\` decimal(20,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`financial_summary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`netDate\` date NOT NULL, \`netTotalValue\` decimal(20,2) NOT NULL, \`netDebitOrCredit\` enum ('DEBIT', 'CREDIT') NOT NULL, \`clearingId\` int NULL, \`exchangeId\` int NULL, \`operationalCostsId\` int NULL, UNIQUE INDEX \`REL_dc143ebf074d7f6bbe353ce79d\` (\`clearingId\`), UNIQUE INDEX \`REL_f8709bb8f05d59ae48e37d51a4\` (\`exchangeId\`), UNIQUE INDEX \`REL_f8f9cfe5c74915c43efcef8647\` (\`operationalCostsId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`general_information\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brokerageOrderNumber\` int NOT NULL, \`tradingFlorDate\` date NOT NULL, \`clientId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`stock\` (\`symbol\` varchar(6) NOT NULL, \`specification\` varchar(255) NOT NULL, PRIMARY KEY (\`symbol\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`market\` enum ('BOVESPA') NOT NULL DEFAULT 'BOVESPA', \`buyOrSell\` enum ('BUY', 'SELL') NOT NULL, \`marketType\` enum ('VISTA') NOT NULL DEFAULT 'VISTA', \`quantity\` int NOT NULL, \`price\` decimal(20,2) NOT NULL, \`total\` decimal(20,2) NOT NULL, \`debitOrCredit\` enum ('DEBIT', 'CREDIT') NOT NULL, \`stock_id\` varchar(6) NULL, \`brokerage_order_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`business_summary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`debentures\` decimal(20,2) NOT NULL, \`sellInCash\` decimal(20,2) NOT NULL, \`buyInCash\` decimal(20,2) NOT NULL, \`optionsBuy\` decimal(20,2) NOT NULL, \`optionsSell\` decimal(20,2) NOT NULL, \`termOptions\` decimal(20,2) NOT NULL, \`federalSecurities\` decimal(20,2) NOT NULL, \`operationValues\` decimal(20,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`brokerage_order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`generalInformationId\` int NULL, \`businessSummaryId\` int NULL, \`financialSummaryId\` int NULL, UNIQUE INDEX \`REL_10a426e32ceb2fd89be0bda5f5\` (\`generalInformationId\`), UNIQUE INDEX \`REL_12b092bae9cb23a5636f68658d\` (\`businessSummaryId\`), UNIQUE INDEX \`REL_d42bfdfd8ee0fc65f0587571b5\` (\`financialSummaryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`financial_summary\` ADD CONSTRAINT \`FK_dc143ebf074d7f6bbe353ce79d3\` FOREIGN KEY (\`clearingId\`) REFERENCES \`clearing\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`financial_summary\` ADD CONSTRAINT \`FK_f8709bb8f05d59ae48e37d51a4d\` FOREIGN KEY (\`exchangeId\`) REFERENCES \`exchange\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`financial_summary\` ADD CONSTRAINT \`FK_f8f9cfe5c74915c43efcef86478\` FOREIGN KEY (\`operationalCostsId\`) REFERENCES \`operational_costs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_259c5b9be45d406a02f86543c47\` FOREIGN KEY (\`stock_id\`) REFERENCES \`stock\`(\`symbol\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_474dfa8efeb23f2690d136105f6\` FOREIGN KEY (\`brokerage_order_id\`) REFERENCES \`brokerage_order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brokerage_order\` ADD CONSTRAINT \`FK_10a426e32ceb2fd89be0bda5f53\` FOREIGN KEY (\`generalInformationId\`) REFERENCES \`general_information\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brokerage_order\` ADD CONSTRAINT \`FK_12b092bae9cb23a5636f68658d0\` FOREIGN KEY (\`businessSummaryId\`) REFERENCES \`business_summary\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brokerage_order\` ADD CONSTRAINT \`FK_d42bfdfd8ee0fc65f0587571b55\` FOREIGN KEY (\`financialSummaryId\`) REFERENCES \`financial_summary\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`brokerage_order\` DROP FOREIGN KEY \`FK_d42bfdfd8ee0fc65f0587571b55\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`brokerage_order\` DROP FOREIGN KEY \`FK_12b092bae9cb23a5636f68658d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`brokerage_order\` DROP FOREIGN KEY \`FK_10a426e32ceb2fd89be0bda5f53\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_474dfa8efeb23f2690d136105f6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_259c5b9be45d406a02f86543c47\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`financial_summary\` DROP FOREIGN KEY \`FK_f8f9cfe5c74915c43efcef86478\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`financial_summary\` DROP FOREIGN KEY \`FK_f8709bb8f05d59ae48e37d51a4d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`financial_summary\` DROP FOREIGN KEY \`FK_dc143ebf074d7f6bbe353ce79d3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d42bfdfd8ee0fc65f0587571b5\` ON \`brokerage_order\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_12b092bae9cb23a5636f68658d\` ON \`brokerage_order\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_10a426e32ceb2fd89be0bda5f5\` ON \`brokerage_order\``,
    );
    await queryRunner.query(`DROP TABLE \`brokerage_order\``);
    await queryRunner.query(`DROP TABLE \`business_summary\``);
    await queryRunner.query(`DROP TABLE \`order\``);
    await queryRunner.query(`DROP TABLE \`stock\``);
    await queryRunner.query(`DROP TABLE \`general_information\``);
    await queryRunner.query(
      `DROP INDEX \`REL_f8f9cfe5c74915c43efcef8647\` ON \`financial_summary\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f8709bb8f05d59ae48e37d51a4\` ON \`financial_summary\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_dc143ebf074d7f6bbe353ce79d\` ON \`financial_summary\``,
    );
    await queryRunner.query(`DROP TABLE \`financial_summary\``);
    await queryRunner.query(`DROP TABLE \`operational_costs\``);
    await queryRunner.query(`DROP TABLE \`exchange\``);
    await queryRunner.query(`DROP TABLE \`clearing\``);
  }
}
