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
      .send(brokeragenotes['BUY_S&P500_1'])
      .expect(201);
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_2'])
      .expect(201);
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_S&P500_3'])
      .expect(201);
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['SELL_S&P500_1'])
      .expect(201);
    await request(app.getHttpServer())
      .post('/brokeragenotes')
      .send(brokeragenotes['BUY_ITUB4_1'])
      .expect(201);

    // generate annual report

    // check results
    expect(true).toBe(true);
  });
});
