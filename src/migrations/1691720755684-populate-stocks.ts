import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateStocks1691720755684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO stock (symbol, specification)
      VALUES ('ITUB4', 'Itau bla bla'),
             ('SAPR11', 'Sanepar teste')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "stock" WHERE "symbol" = 'ITUB4' OR "symbol" = 'SAPR11'`,
    );
  }
}
