import { DivideBy100 } from '../../../../../decorators/divide-by-100';

enum Market {
  BOVESPA = 'BOVESPA',
}

enum BuyOrSell {
  BUY = 'BUY',
  SELL = 'SELL',
}

enum MarketType {
  VISTA = 'VISTA',
}

enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class OrderResponseDto {
  id?: number;

  market: Market;

  buyOrSell: BuyOrSell;

  marketType: MarketType;

  symbol: string;

  quantity: number;

  @DivideBy100()
  price: number;

  @DivideBy100()
  total: number;

  debitOrCredit: DebitOrCredit;
}
