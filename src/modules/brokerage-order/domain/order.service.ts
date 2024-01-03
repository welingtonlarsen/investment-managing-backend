import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Order } from '../adapter/repository/entity/order.typeorm.entity';
import { BuyOrSell } from './entity/order.entity';
import { lastDayOfMonth, parse } from 'date-fns';
import { Injectable } from '@nestjs/common';

type Month =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getMonthOrdersGroupedByBuyAndSell(monthName: Month, year: number) {
    const date = parse(monthName, 'MMMM', new Date());
    date.setFullYear(year);

    const ordersOfMonth = await this.orderRepository.find({
      relations: ['brokerageOrder'],
      // loadRelationIds: true,
      where: {
        brokerageOrder: {
          generalInformation: {
            tradingFlorDate: Between(date, lastDayOfMonth(date)),
          },
        },
      },
    });

    const ordersOfMonthGroupedByType = {
      buy: ordersOfMonth
        .filter((order) => order.buyOrSell === BuyOrSell.BUY)
        .reduce((orders, currentOrder) => {
          return [
            ...orders,
            {
              date: currentOrder.brokerageOrder.generalInformation
                .tradingFlorDate,
              symbol: currentOrder.stock.symbol,
              quantity: currentOrder.quantity,
              price: currentOrder.price,
              total: currentOrder.total,
            },
          ];
        }, []),

      sell: ordersOfMonth
        .filter((operation) => operation.buyOrSell === BuyOrSell.SELL)
        .reduce((orders, currentOrder) => {
          return [
            ...orders,
            {
              date: currentOrder.brokerageOrder.generalInformation
                .tradingFlorDate,
              symbol: currentOrder.stock.symbol,
              quantity: currentOrder.quantity,
              price: currentOrder.price,
              total: currentOrder.total,
            },
          ];
        }, []),
    };

    return ordersOfMonthGroupedByType;
  }
}
