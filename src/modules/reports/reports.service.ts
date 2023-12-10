import { Injectable } from '@nestjs/common';
import { BrokerageOrderService } from '../brokerage-order/domain/brokerage-order.service';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { BrokerageOrder } from '../brokerage-order/adapter/repository/entity/brokerage-order.db.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import {
  BuyOrSell,
  Order,
} from '../brokerage-order/adapter/repository/entity/order.typeorm.entity';
import { lastDayOfMonth, parse } from 'date-fns';

@Injectable()
export class ReportsService {
  constructor(
    private brokerageOrderService: BrokerageOrderService,
    @InjectRepository(BrokerageOrder)
    private readonly brokerageOrderRepository: Repository<BrokerageOrder>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  public async generateAnnual() {
    const year = 2022;
    // const months = Array.from({ length: 12 }, (_, i) => i);

    const months = {
      january: {},
      february: {},
      march: {},
      april: {},
      may: {},
      june: {},
      july: {},
      august: {},
      september: {},
      october: {},
      november: {},
      december: {},
    };

    // fetch stock symbols traded on year
    const orders = await this.orderRepository.find({
      where: {
        brokerageOrder: {
          generalInformation: {
            tradingFlorDate: MoreThanOrEqual(new Date(`${year}/01/01`)),
          },
        },
      },
      select: ['id'],
    });
    const stockSymbols = [
      ...new Set(orders.map((order) => order.stock.symbol)),
    ];

    // fetch operations by month
    await Promise.all(
      Object.keys(months).map(async (monthName) => {
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
                  stockSymbol: currentOrder.stock.symbol,
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
                  stockSymbol: currentOrder.stock.symbol,
                  quantity: currentOrder.quantity,
                  price: currentOrder.price,
                  total: currentOrder.total,
                },
              ];
            }, []),
        };

        const buySideAvegagePrice = ordersOfMonthGroupedByType.buy.reduce(
          (total, current) => {
            const stockSybom = current.stockSymbol;

            if (total[stockSybom]) {
              const newQuantity = total[stockSybom].quantity + current.quantity;
              const newAverage =
                (total[stockSybom].average * total[stockSybom].quantity +
                  current.total) /
                newQuantity;

              return {
                ...total,
                [stockSybom]: { quantity: newQuantity, average: newAverage },
              };
            } else {
              const quantity = current.quantity;
              const average = current.total / quantity;
              return {
                ...total,
                [stockSybom]: { quantity, average },
              };
            }
          },
          {},
        );

        const sellSideAvegagePrice = ordersOfMonthGroupedByType.sell.reduce(
          (total, current) => {
            const stockSybom = current.stockSymbol;

            if (total[stockSybom]) {
              const newQuantity = total[stockSybom].quantity + current.quantity;
              const newAverage =
                (total[stockSybom].average * total[stockSybom].quantity +
                  current.total) /
                newQuantity;

              return {
                ...total,
                [stockSybom]: { quantity: newQuantity, average: newAverage },
              };
            } else {
              const quantity = current.quantity;
              const average = current.total / quantity;
              return {
                ...total,
                [stockSybom]: { quantity, average },
              };
            }
          },
          {},
        );

        months[monthName] = {
          buy: buySideAvegagePrice,
          sell: sellSideAvegagePrice,
        };
      }),
    );

    return { stockSymbols, months };
  }
}
