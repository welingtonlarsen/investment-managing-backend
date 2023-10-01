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

export type OrderDto = {
  market: Market;
  buyOrSell: BuyOrSell;
  marketType: MarketType;
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  debitOrCredit: DebitOrCredit;
};
