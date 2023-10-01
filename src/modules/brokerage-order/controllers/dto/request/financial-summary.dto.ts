import {
  IsDate,
  IsEnum,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MultiplyBy100 } from '../../../../../decorators/multiply-by-100';

class Clearing {
  id?: number;

  @IsNumber()
  @MultiplyBy100()
  operationsNetValue: number;

  @IsNumber()
  @MultiplyBy100()
  settlementFee: number;

  @IsNumber()
  @MultiplyBy100()
  registryFee: number;

  @IsNumber()
  @MultiplyBy100()
  totalCblc: number;
}

class Exchange {
  id?: number;

  @IsNumber()
  @MultiplyBy100()
  termOrOptionsFee: number;

  @IsNumber()
  @MultiplyBy100()
  anaFee: number;

  @IsNumber()
  @MultiplyBy100()
  fees: number;

  @IsNumber()
  @MultiplyBy100()
  total: number;
}

class OperationalCosts {
  id?: number;

  @IsNumber()
  @MultiplyBy100()
  operationalFee: number;

  @IsNumber()
  @MultiplyBy100()
  execution: number;

  @IsNumber()
  @MultiplyBy100()
  custody: number;

  @IsNumber()
  @MultiplyBy100()
  taxes: number;

  @IsNumber()
  @MultiplyBy100()
  irrf: number;

  @IsNumber()
  @MultiplyBy100()
  others: number;

  @IsNumber()
  @MultiplyBy100()
  totalCosts: number;
}

enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class FinancialSummary {
  @IsObject()
  @ValidateNested()
  @Type(() => Clearing)
  clearing: Clearing;

  @IsObject()
  @ValidateNested()
  @Type(() => Exchange)
  exchange: Exchange;

  @IsObject()
  @ValidateNested()
  @Type(() => OperationalCosts)
  operationalCosts: OperationalCosts;

  @IsDate()
  @Type(() => Date)
  netDate: Date;

  @IsNumber()
  @MultiplyBy100()
  netTotalValue: number;

  @IsEnum(DebitOrCredit)
  netDebitOrCredit: DebitOrCredit;
}
