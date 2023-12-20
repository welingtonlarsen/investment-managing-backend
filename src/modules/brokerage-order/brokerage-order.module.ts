import { Module } from '@nestjs/common';
import { BrokerageOrderController } from './controllers/brokerage-order.controller';
import { BrokerageOrderService } from './domain/brokerage-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrokerageOrder } from './adapter/repository/entity/brokerage-order.db.entity';
import { GeneralInformation } from './adapter/repository/entity/general-information.typeorm.entity';
import { Order } from './adapter/repository/entity/order.typeorm.entity';
import {
  Clearing,
  Exchange,
  FinancialSummary,
  OperationalCosts,
} from './adapter/repository/entity/financial-summary.typeorm.entity';
import { BusinessSummary } from './adapter/repository/entity/business-summary.typeorm.entity';
import { provideBrokerageOrderRepository } from './brokerage-order.repository.provider';
import { StockService } from './domain/stock.service';
import { Stock } from './adapter/repository/entity/stock.typeorm.entity';
import { StockController } from './controllers/stock.controller';
import { CustodyModule } from '../custody/custody.module';
import { OrderService } from './domain/order.service';

@Module({
  imports: [
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
    CustodyModule,
  ],
  controllers: [BrokerageOrderController, StockController],
  providers: [
    BrokerageOrderService,
    StockService,
    OrderService,
    ...provideBrokerageOrderRepository(),
  ],
  exports: [BrokerageOrderService, StockService, OrderService],
})
export class BrokerageOrderModule {}
