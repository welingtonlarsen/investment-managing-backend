import { DivideBy100 } from '../../../../../decorators/divide-by-100';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Clearing {
  id?: number;

  @DivideBy100()
  operationsNetValue: number;

  @DivideBy100()
  settlementFee: number;

  @DivideBy100()
  registryFee: number;

  @DivideBy100()
  totalCblc: number;
}

class Exchange {
  id?: number;

  @DivideBy100()
  termOrOptionsFee: number;

  @DivideBy100()
  anaFee: number;

  @DivideBy100()
  fees: number;

  @DivideBy100()
  total: number;
}

class OperationalCosts {
  id?: number;

  @DivideBy100()
  operationalFee: number;

  @DivideBy100()
  execution: number;

  @DivideBy100()
  custody: number;

  @DivideBy100()
  taxes: number;

  @DivideBy100()
  irrf: number;

  @DivideBy100()
  others: number;

  @DivideBy100()
  totalCosts: number;
}

enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export class FinancialSummaryResponseDto {
  @ValidateNested()
  @Type(() => Clearing)
  clearing: Clearing;

  @ValidateNested()
  @Type(() => Exchange)
  exchange: Exchange;

  @ValidateNested()
  @Type(() => OperationalCosts)
  operationalCosts: OperationalCosts;

  netDate: Date;

  @DivideBy100()
  netTotalValue: number;

  netDebitOrCredit: DebitOrCredit;
}
