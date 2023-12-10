import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerageOrder } from '../brokerage-order/adapter/repository/entity/brokerage-order.db.entity';
import {
  Clearing,
  Exchange,
  OperationalCosts,
} from '../brokerage-order/adapter/repository/entity/financial-summary.typeorm.entity';
import { GeneralInformation } from '../brokerage-order/adapter/repository/entity/general-information.typeorm.entity';
import { Order } from '../brokerage-order/adapter/repository/entity/order.typeorm.entity';
import { Stock } from '../brokerage-order/adapter/repository/entity/stock.typeorm.entity';
import { BusinessSummary } from '../brokerage-order/controllers/dto/request/business-summary.dto';
import { FinancialSummary } from '../brokerage-order/controllers/dto/request/financial-summary.dto';
import { BrokerageOrderModule } from '../brokerage-order/brokerage-order.module';

@Module({
  imports: [
    BrokerageOrderModule,
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
  providers: [ReportsService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {}
