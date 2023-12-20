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
import { StockService } from '../brokerage-order/domain/stock.service';
import { OrderService } from '../brokerage-order/domain/order.service';

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

const EMPTY_MONTHS: Record<Month, any> = {
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

@Injectable()
export class ReportsService {
  constructor(
    private custodyService: CustodyService,
    private stockService: StockService,
    private orderService: OrderService,
  ) {}
  public async generateAnnual() {
    const year = 2022;

    const months = { ...EMPTY_MONTHS };

    const { tradedStocks, tradedStockSymbols } =
      await this.stockService.getStocksSymbolsTradedOnYear(year);

    for (const monthName of Object.keys(months) as Month[]) {
      const ordersOfMonthGroupedByBuyAndSell =
        await this.orderService.getMonthOrdersGroupedByBuyAndSell(
          monthName,
          year,
        );

      const buySideAvegagePrice = this.calculateAveragePrice(
        ordersOfMonthGroupedByBuyAndSell,
        'buy',
      );

      const sellSideAvegagePrice = this.calculateAveragePrice(
        ordersOfMonthGroupedByBuyAndSell,
        'sell',
      );

      const custody = await this.custodyService.getCustodyToMonth(
        monthName,
        year,
        tradedStocks,
      );

      months[monthName] = {
        buy: buySideAvegagePrice,
        sell: sellSideAvegagePrice,
        custody,
      };
    }

    return { tradedStockSymbols, months };
  }

  private calculateAveragePrice(ordersOfMonthGroupedByBuyAndSell, buyOrSell) {
    return ordersOfMonthGroupedByBuyAndSell[buyOrSell].reduce(
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
  }
}
