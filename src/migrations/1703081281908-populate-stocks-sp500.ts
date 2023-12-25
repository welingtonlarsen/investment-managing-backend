import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateStocksSp5001703081281908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              INSERT INTO stock (symbol, specification)
              VALUES ('S&P500', 'IShare S&P500')
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "stock" WHERE "symbol" = 'S&P500'`);
  }
}
