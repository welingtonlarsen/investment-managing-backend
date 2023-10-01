type Clearing = {
  id?: number;
  operationsNetValue: number;
  settlementFee: number;
  registryFee: number;
  totalCblc: number;
};

type Exchange = {
  id?: number;
  termOrOptionsFee: number;
  anaFee: number;
  fees: number;
  total: number;
};

type OperationalCosts = {
  id?: number;
  operationalFee: number;
  execution: number;
  custody: number;
  taxes: number;
  irrf: number;
  others: number;
  totalCosts: number;
};

export enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export type FinancialSummaryEntity = {
  id?: number;
  clearing: Clearing;
  exchange: Exchange;
  operationalCosts: OperationalCosts;
  netDate: Date;
  netTotalValue: number;
  netDebitOrCredit: DebitOrCredit;
};
