import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrokerageOrderModule } from './brokerage-order/brokerage-order.module';
import { ReportsModule } from './reports/reports.module';
import { CustodyModule } from './custody/custody.module';
import DatabaseModule from './configuration/database/database.module';

@Module({
  imports: [
    BrokerageOrderModule,
    ConfigModule.forRoot({
      envFilePath: globalThis.ENV_FILE || 'environments/.env',
    }),
    DatabaseModule,
    ReportsModule,
    CustodyModule,
  ],
})
export class AppModule {}
