import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import * as request from 'supertest';
import brokeragenotes from './support/brokeragenotes';

describe('Reports e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testingModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('generates annual report without initial custody', async () => {
    // create many brokerage notes to many months
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_1'])
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_2'])
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JULY_1'])
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['SELL_S&P500_JULY_1'])

    // generate annual report
    const result = await request(app.getHttpServer()).post('/reports/2023')

    // check results
    expect(result.body.months['june']).toStrictEqual({
      buy: {
        "S&P500": {
          quantity: 27,
          average: 23552.037037037036,
        },
      },
      sell: {},
      custody: [{
        stock: {
          symbol: "S&P500",
          specification: "IShare S&P500",
        },
        quantity: 27,
        averagePrice: 235.52,
        buyPrice: 235.52,
        buyQuantity: 27,
        createdAt: "2023-06-21",
        id: 2,
      }]
    })

    expect(result.body.months['july']).toStrictEqual({
      buy: {
        "S&P500": {
          quantity: 2,
          average: 20210,
        },
      },
      sell: {
        "S&P500": {
          quantity: 5,
          average: 22553,
        },
      },
      custody: [{
        stock: {
          symbol: "S&P500",
          specification: "IShare S&P500",
        },
        quantity: 24,
        averagePrice: 234.82,
        buyPrice: 233.22,
        buyQuantity: 29,
        createdAt: "2023-07-09",
        id: 4,
      }]
    })
  });
});
