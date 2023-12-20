import { MigrationInterface, QueryRunner } from "typeorm";

export class changeCustodyCreatedAt1702178602612 implements MigrationInterface {
    name = 'changeCustodyCreatedAt1702178602612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "custody" RENAME COLUMN "cratedAt" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "custody" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "custody" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "custody" RENAME COLUMN "createdAt" TO "cratedAt"`);
    }

}
