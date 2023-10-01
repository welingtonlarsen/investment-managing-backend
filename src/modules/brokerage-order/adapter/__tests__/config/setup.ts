import { DataSource } from 'typeorm';

const databaseName = process.env.TYPEORM_DATABASE;
let masterConnection: DataSource;

export async function databaseIntegrationSetup() {
  try {
    const { options } = await import(
      '../../../../configuration/database/datasource'
    );
    masterConnection = new DataSource(options);
    await masterConnection.initialize();
    await resetDatabase();
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
}

export async function closeDatabaseIntegrationConnections() {
  try {
    await resetDatabase();
    await masterConnection.destroy();
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
}

export async function resetDatabase() {
  try {
    await masterConnection.query(`DROP DATABASE ${databaseName}`);
    await masterConnection.query(`CREATE DATABASE ${databaseName}`);
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
}
