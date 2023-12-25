import { Module } from '@nestjs/common';
import { CustodyService } from './custody.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Custody } from './custody.entity';
import { Stock } from '../brokerage-order/adapter/repository/entity/stock.typeorm.entity';
import { CustodyController } from './custody.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Custody, Stock])],
  controllers: [CustodyController],
  providers: [CustodyService],
  exports: [CustodyService],
})
export class CustodyModule {}
