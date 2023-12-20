import { Injectable } from '@nestjs/common';
import { Stock } from '../brokerage-order/adapter/repository/entity/stock.typeorm.entity';
import { BuyOrSell } from '../brokerage-order/domain/entity/order.entity';
import { Custody } from './custody.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { OrderDto } from '../brokerage-order/domain/dto/order.dto';
import { lastDayOfMonth, parse } from 'date-fns';

@Injectable()
export class CustodyService {
  constructor(
    @InjectRepository(Custody) private custodyRepository: Repository<Custody>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
  ) {}

  async upsertCustody(orders: OrderDto[], date: Date) {
    await Promise.all(
      orders.map(async (order) => {
        const stock = await this.stockRepository.findOneBy({
          symbol: order.symbol,
        });

        const lastCustody = await this.custodyRepository.findOne({
          where: { stock },
          order: { id: 'DESC' },
        });

        if (!lastCustody || lastCustody.quantity === 0) {
          if (order.buyOrSell === BuyOrSell.SELL)
            throw new Error('Sell operation side not implemented');

          const custody = new Custody(
            stock,
            order.quantity,
            order.price,
            order.quantity,
            order.price,
            date,
          );

          await this.custodyRepository.save(custody);

          return;
        }

        let newCustodyQuantity = undefined;
        let newAveragePrice = undefined;
        let newBuyQuantity = undefined;
        let newBuyPrice = undefined;

        if (order.buyOrSell === BuyOrSell.BUY) {
          newCustodyQuantity = lastCustody.quantity + order.quantity;
          newAveragePrice =
            (lastCustody.quantity * lastCustody.averagePrice +
              order.quantity * order.price) /
            newCustodyQuantity;

          newBuyQuantity = lastCustody.buyQuantity + order.quantity;
          newBuyPrice =
            (lastCustody.buyPrice * lastCustody.buyQuantity +
              order.price * order.quantity) /
            newBuyQuantity;
        } else {
          if (order.quantity > lastCustody.quantity)
            throw new Error('Sell operation side not implemented');

          newCustodyQuantity = lastCustody.quantity - order.quantity;
          newAveragePrice =
            (lastCustody.averagePrice * lastCustody.quantity -
              order.price * order.quantity) /
            newCustodyQuantity;

          newBuyQuantity = lastCustody.buyQuantity;
          newBuyPrice = lastCustody.buyPrice;
        }

        const custody = new Custody(
          stock,
          newCustodyQuantity,
          newAveragePrice,
          newBuyQuantity,
          newBuyPrice,
          date,
        );
        await this.custodyRepository.save(custody);
      }),
    );
  }

  async getCustodyToMonth(
    month:
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
      | 'december',
    year: number,
    stocks: Stock[],
  ) {
    const date = parse(month, 'MMMM', new Date());
    date.setFullYear(year);

    const custodies = [];

    await Promise.all(
      stocks.map(async (stock) => {
        const custody = await this.custodyRepository.findOne({
          where: {
            createdAt: LessThanOrEqual(lastDayOfMonth(date)),
            stock,
          },
          order: { id: 'DESC' },
        });

        if (custody) custodies.push(custody);
      }),
    );

    return custodies;
  }
}
