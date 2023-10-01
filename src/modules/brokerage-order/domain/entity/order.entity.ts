import { StockEntity } from './stock.entity';

export enum Market {
  BOVESPA = 'BOVESPA',
}

export enum BuyOrSell {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum MarketType {
  VISTA = 'VISTA',
}

export enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export type OrderEntity = {
  id?: number;
  market: Market;
  buyOrSell: BuyOrSell;
  marketType: MarketType;
  stock: StockEntity;
  quantity: number;
  price: number;
  total: number;
  debitOrCredit: DebitOrCredit;
};
