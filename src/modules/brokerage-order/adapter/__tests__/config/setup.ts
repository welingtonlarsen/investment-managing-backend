import { DataSource } from 'typeorm';
import { BrokerageOrder } from '../../repository/entity/brokerage-order.db.entity';

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
    // It's possible because I'm using cascade all
    const brokerageOrderRepository =
      masterConnection.getRepository(BrokerageOrder);
    brokerageOrderRepository.clear();
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
}
