import { Injectable } from '@nestjs/common';
import { Stock } from '../adapter/repository/entity/stock.typeorm.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../adapter/repository/entity/order.typeorm.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<Stock>> {
    return await paginate<Stock>(this.stockRepository, options);
  }

  async getStocksSymbolsTradedOnYear(year: number) {
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
    const tradedStockSymbols = [
      ...new Set(orders.map((order) => order.stock.symbol)),
    ];
    const tradedStocks = tradedStockSymbols.reduce(
      (stocks: Stock[], symbol: string) => {
        const isAlreadyListed = !!stocks.find(
          (stock) => stock.symbol === symbol,
        );

        if (!isAlreadyListed) {
          const stock = orders
            .map((order) => order.stock)
            .filter((stock) => stock.symbol === symbol)[0];
          stocks.push(stock);
        }

        return stocks;
      },
      [],
    );

    return { tradedStocks, tradedStockSymbols };
  }
}
