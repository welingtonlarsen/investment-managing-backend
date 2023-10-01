import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MultiplyBy100 } from '../../../../../decorators/multiply-by-100';

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

export class OrderDto {
  id?: number;

  @IsEnum(Market)
  market: Market;

  @IsEnum(BuyOrSell)
  buyOrSell: BuyOrSell;

  @IsEnum(MarketType)
  marketType: MarketType;

  @IsNotEmpty()
  symbol: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  @MultiplyBy100()
  price: number;

  @IsNumber()
  @MultiplyBy100()
  total: number;

  @IsEnum(DebitOrCredit)
  debitOrCredit: DebitOrCredit;
}
