import { Repository } from 'typeorm';
import { BrokerageOrder } from './adapter/repository/entity/brokerage-order.db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BrokerageOrderTypeormRepository } from './adapter/repository/brokerage-order.typeorm.repository';
import { Provider } from '@nestjs/common';
import { BROKERAGE_ORDER_REPOSITORY_TOKEN } from './adapter/repository/brokerage-order.interface';
import { Stock } from './adapter/repository/entity/stock.typeorm.entity';

export function provideBrokerageOrderRepository(): Provider[] {
  const result = [
    {
      provide: BROKERAGE_ORDER_REPOSITORY_TOKEN,
      useFactory: async (
        dependenciesProvider: BrokerageOrderRepoDependenciesProvider,
      ) => provideBrokerageOrderRepositoryFactory(dependenciesProvider),
      inject: [BrokerageOrderRepoDependenciesProvider],
    },
    BrokerageOrderRepoDependenciesProvider,
  ];
  return result;
}

async function provideBrokerageOrderRepositoryFactory(
  dependenciesProvider: BrokerageOrderRepoDependenciesProvider,
) {
  await ConfigModule.envVariablesLoaded;
  switch (process.env.DATABASE_DATASOURCE) {
    case 'typeorm':
      return new BrokerageOrderTypeormRepository(
        dependenciesProvider.brokerageOrderTypeOrmRepository,
        dependenciesProvider.stockTypeOrmRepository,
      );
    case 'prisma':
    default:
      throw new Error('Data source not implemented');
  }
}

export class BrokerageOrderRepoDependenciesProvider {
  constructor(
    @InjectRepository(BrokerageOrder)
    public brokerageOrderTypeOrmRepository: Repository<BrokerageOrder>,

    @InjectRepository(Stock)
    public stockTypeOrmRepository: Repository<Stock>,
  ) {}
}
