import { INestApplication } from '@nestjs/common';
import {
  closeDatabaseIntegrationConnections,
  databaseIntegrationSetup,
} from './config/setup';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerageOrderTypeormRepository } from '../repository/brokerage-order.typeorm.repository';
import { Repository } from 'typeorm';
import { BrokerageOrder } from '../repository/entity/brokerage-order.db.entity';
import { brokerageOrderEntity, stock } from './seed/brokerage-order-entity';
import { BROKERAGE_ORDER_REPOSITORY_TOKEN } from '../repository/brokerage-order.interface';
import { ConfigModule } from '@nestjs/config';
import { BusinessSummary } from '../repository/entity/business-summary.typeorm.entity';
import {
  Clearing,
  Exchange,
  OperationalCosts,
  FinancialSummary,
} from '../repository/entity/financial-summary.typeorm.entity';
import { GeneralInformation } from '../repository/entity/general-information.typeorm.entity';
import { Order } from '../repository/entity/order.typeorm.entity';
import DatabaseModule from '../../../configuration/database/database.module';
import { provideBrokerageOrderRepository } from '../../brokerage-order.repository.provider';
import { Stock } from '../repository/entity/stock.typeorm.entity';

describe('Brokerage Order TypeORM Repository tests', () => {
  let app: INestApplication;
  let brokerageOrderRepository: Repository<BrokerageOrder>;
  let stockRepository: Repository<Stock>;
  let brokerageOrderTypeormRepository: BrokerageOrderTypeormRepository;

  beforeEach(async () => {
    await databaseIntegrationSetup();

    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: globalThis.ENV_FILE }),
        DatabaseModule,
        TypeOrmModule.forFeature([
          BrokerageOrder,
          GeneralInformation,
          Order,
          BusinessSummary,
          Clearing,
          Exchange,
          OperationalCosts,
          FinancialSummary,
          Stock,
        ]),
      ],
      providers: [...provideBrokerageOrderRepository()],
    }).compile();

    app = testingModule.createNestApplication();

    brokerageOrderRepository = testingModule.get<Repository<BrokerageOrder>>(
      `${BrokerageOrder.name}Repository`,
    );
    stockRepository = testingModule.get<Repository<Stock>>(
      `${Stock.name}Repository`,
    );

    brokerageOrderTypeormRepository =
      testingModule.get<BrokerageOrderTypeormRepository>(
        BROKERAGE_ORDER_REPOSITORY_TOKEN,
      );

    await stockRepository.save(stock);
  });

  afterEach(async () => {
    await closeDatabaseIntegrationConnections();
    await app.close();
  });

  it('should successful save a brokerage order', async () => {
    await brokerageOrderTypeormRepository.upsert(brokerageOrderEntity);

    const persistedBrokerageOrders = await brokerageOrderRepository.find();
    expect(persistedBrokerageOrders.length).toBe(1);

    expect(persistedBrokerageOrders[0]).toMatchObject({
      generalInformation: {
        brokerageOrderNumber: 51198038,
        tradingFlorDate: {},
        clientId: '2079101',
        id: 1,
      },
      orders: [
        {
          market: 'BOVESPA',
          buyOrSell: 'BUY',
          marketType: 'VISTA',
          stock: {
            symbol: 'HGCR11',
            specification: 'FII CSHGCRI HGCR11',
          },
          quantity: 100,
          price: 1850,
          total: 185000,
          debitOrCredit: 'DEBIT',
          id: 1,
        },
      ],
      businessSummary: {
        debentures: 0,
        sellInCash: 0,
        buyInCash: 185000,
        optionsBuy: 0,
        optionsSell: 0,
        termOptions: 0,
        federalSecurities: 0,
        operationValues: 185000,
        id: 1,
      },
      financialSummary: {
        clearing: {
          operationsNetValue: 185000,
          settlementFee: 46,
          registryFee: 0,
          totalCblc: 185046,
          id: 1,
        },
        exchange: {
          termOrOptionsFee: 0,
          anaFee: 0,
          fees: 9,
          total: 9,
          id: 1,
        },
        operationalCosts: {
          operationalFee: 490,
          execution: 0,
          custody: 0,
          taxes: 52,
          irrf: 0,
          others: 19,
          totalCosts: 561,
          id: 1,
        },
        netDate: {},
        netTotalValue: 185616,
        netDebitOrCredit: 'DEBIT',
        id: 1,
      },
      id: 1,
    });
  });

  it('should successful find all brokerage orders', async () => {
    await brokerageOrderRepository.save(brokerageOrderEntity);

    const { items } = await brokerageOrderTypeormRepository.findAll({
      page: 1,
      limit: 1,
    });

    expect(items.length).toEqual(1);
    expect(JSON.stringify(items[0])).toStrictEqual(
      JSON.stringify({
        generalInformation: {
          brokerageOrderNumber: 51198038,
          tradingFlorDate: '2022-06-24T00:00:00.000Z',
          clientId: '2079101',
          id: 1,
        },
        orders: [
          {
            market: 'BOVESPA',
            buyOrSell: 'BUY',
            marketType: 'VISTA',
            stock: {
              symbol: 'HGCR11',
              specification: 'FII CSHGCRI HGCR11',
            },
            quantity: 100,
            price: 1850,
            total: 185000,
            debitOrCredit: 'DEBIT',
            id: 1,
          },
        ],
        businessSummary: {
          debentures: 0,
          sellInCash: 0,
          buyInCash: 185000,
          optionsBuy: 0,
          optionsSell: 0,
          termOptions: 0,
          federalSecurities: 0,
          operationValues: 185000,
          id: 1,
        },
        financialSummary: {
          clearing: {
            operationsNetValue: 185000,
            settlementFee: 46,
            registryFee: 0,
            totalCblc: 185046,
            id: 1,
          },
          exchange: {
            termOrOptionsFee: 0,
            anaFee: 0,
            fees: 9,
            total: 9,
            id: 1,
          },
          operationalCosts: {
            operationalFee: 490,
            execution: 0,
            custody: 0,
            taxes: 52,
            irrf: 0,
            others: 19,
            totalCosts: 561,
            id: 1,
          },
          netDate: '2022-06-28T00:00:00.000Z',
          netTotalValue: 185616,
          netDebitOrCredit: 'DEBIT',
          id: 1,
        },
        id: 1,
      }),
    );
  });
});
