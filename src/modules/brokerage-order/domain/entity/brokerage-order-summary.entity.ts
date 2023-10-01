import { BrokerageOrderEntity } from './brokerage-order.entity';
import { BuyOrSell, DebitOrCredit, OrderEntity } from './order.entity';

export class BrokerageOrderSummary {
  readonly id: number;

  readonly date: Date;

  readonly exchange: string;

  readonly purchases: number;

  readonly sales: number;

  readonly costs: number;

  readonly net: number;

  readonly debitOrCredit: DebitOrCredit;

  constructor(brokerageOrder: BrokerageOrderEntity) {
    this.id = brokerageOrder.id;
    this.date = brokerageOrder.generalInformation.tradingFlorDate;
    this.exchange = 'Corretora Padrão';
    this.purchases = brokerageOrder.businessSummary.buyInCash;
    this.sales = brokerageOrder.businessSummary.sellInCash;
    this.costs = brokerageOrder.financialSummary.operationalCosts.totalCosts;
    this.net = brokerageOrder.financialSummary.netTotalValue;
    this.debitOrCredit = brokerageOrder.financialSummary.netDebitOrCredit;
  }

  private calculatePurchases(orders: OrderEntity[]): number {
    const totalInCents = orders.reduce((previous, current) => {
      return current.buyOrSell === BuyOrSell.BUY
        ? previous + current.total
        : previous;
    }, 0);
    return totalInCents * 100;
  }

  private calculateSales(orders: OrderEntity[]): number {
    const totalInCents = orders.reduce((previous, current) => {
      return current.buyOrSell === BuyOrSell.SELL
        ? previous + current.total
        : previous;
    }, 0);
    return totalInCents * 100;
  }
}
