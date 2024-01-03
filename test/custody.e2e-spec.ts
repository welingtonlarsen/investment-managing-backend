import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/modules/app.module';
import * as request from 'supertest';
import brokeragenotes from './support/brokeragenotes';
import { format } from 'date-fns';

describe('Custody e2e', () => {
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

  it('creates first custody when new stock is added', async () => {
    // create new brokerage note
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_1'])
      .expect(201);

    // get custody
    const createdCustody = await request(app.getHttpServer()).get('/custody');

    // expect results
    expect(createdCustody.statusCode).toBe(200);
    expect(createdCustody.body).toStrictEqual([
      {
        stock: {
          symbol: 'S&P500',
          specification: 'IShare S&P500',
        },
        quantity: 22,
        averagePrice: 23645,
        buyPrice: 23645,
        buyQuantity: 22,
        createdAt: '2023-06-19',
        id: 1,
      },
    ]);
  });

  it('updates custody when purchase stock already on portfolio', async () => {
    // create new brokerage note
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_1'])
      .expect(201);

    // create other brokerage order
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_2'])
      .expect(201);

    // get custody
    const createdCustody = await request(app.getHttpServer()).get('/custody');

    expect(createdCustody.statusCode).toBe(200);
    expect(createdCustody.body).toStrictEqual([
      {
        stock: {
          symbol: 'S&P500',
          specification: 'IShare S&P500',
        },
        quantity: 27,
        averagePrice: 23552,
        buyPrice: 23552,
        buyQuantity: 27,
        createdAt: '2023-06-21',
        id: 2,
      },
    ]);
  });

  it('updates custody when sell stock already on portfolio', async () => {
    // create new brokerage note
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_1'])
      .expect(201);

    // create other brokerage order
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_2'])
      .expect(201);

    // create selling brokerage order
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['SELL_S&P500_JULY_1'])
      .expect(201);

    // get custody
    const createdCustody = await request(app.getHttpServer()).get('/custody');

    expect(createdCustody.statusCode).toBe(200);
    expect(createdCustody.body).toStrictEqual([
      {
        stock: {
          symbol: 'S&P500',
          specification: 'IShare S&P500',
        },
        quantity: 22,
        averagePrice: 23779,
        buyPrice: 23552,
        buyQuantity: 27,
        createdAt: '2023-07-09',
        id: 3,
      },
    ]);
  });

  it('updates custody when include new stock', async () => {
    // create new brokerage note
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_1'])
      .expect(201);

    // create other brokerage order
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_JUNE_2'])
      .expect(201);

    // create selling brokerage order
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['SELL_S&P500_JULY_1'])
      .expect(201);

    // create brokerage order with new stock
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_ITUB4_1'])
      .expect(201);

    // get custody
    const createdCustody = await request(app.getHttpServer()).get('/custody');

    expect(createdCustody.statusCode).toBe(200);
    expect(createdCustody.body).toStrictEqual([
      {
        stock: {
          symbol: 'ITUB4',
          specification: 'Itau bla bla',
        },
        quantity: 100,
        averagePrice: 2430,
        buyPrice: 2430,
        buyQuantity: 100,
        createdAt: '2023-08-11',
        id: 4,
      },
      {
        stock: {
          symbol: 'S&P500',
          specification: 'IShare S&P500',
        },
        quantity: 22,
        averagePrice: 23779,
        buyPrice: 23552,
        buyQuantity: 27,
        createdAt: '2023-07-09',
        id: 3,
      },
    ]);
  });

  it('returns 501 Not Implemented when sell stock not on portfolio', async () => {
    // create selling brokerage order
    const result = await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['SELL_S&P500_JULY_1']);

    expect(result.statusCode).toBe(501);
    expect(result.body).toStrictEqual({
      statusCode: 501,
      message: 'Sell operation side not implemented',
      error: 'Not Implemented',
    });
  });
});
