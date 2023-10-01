import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrokerageOrderModule } from './brokerage-order/brokerage-order.module';
import DatabaseModule from './configuration/database/database.module';

@Module({
  imports: [
    BrokerageOrderModule,
    ConfigModule.forRoot({
      envFilePath: globalThis.ENV_FILE || 'environments/.env',
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
