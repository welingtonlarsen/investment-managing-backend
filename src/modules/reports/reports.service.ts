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
import { CustodyService } from '../custody/custody.service';
import { stock } from '../brokerage-order/adapter/__tests__/seed/brokerage-order-entity';
import { Stock } from '../brokerage-order/adapter/repository/entity/stock.typeorm.entity';

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
export class ReportsService {
  constructor(
    private brokerageOrderService: BrokerageOrderService,
    private custodyService: CustodyService,

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
    const stocks = stockSymbols.reduce((stocks: Stock[], symbol: string) => {
      const isAlreadyListed = !!stocks.find((stock) => stock.symbol === symbol);

      if (!isAlreadyListed) {
        const stock = orders
          .map((order) => order.stock)
          .filter((stock) => stock.symbol === symbol)[0];
        stocks.push(stock);
      }

      return stocks;
    }, []);

    // fetch operations by month
    await Promise.all(
      Object.keys(months).map(async (monthName: Month) => {
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

        const custody = await this.custodyService.getCustodyToMonth(
          monthName,
          year,
          stocks,
        );

        months[monthName] = {
          buy: buySideAvegagePrice,
          sell: sellSideAvegagePrice,
          custody,
        };
      }),
    );

    return { stockSymbols, months };
  }
}
