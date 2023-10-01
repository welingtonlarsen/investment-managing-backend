import { BrokerageOrderEntity } from '../../../domain/entity/brokerage-order.entity';
import { BusinessSummaryEntity } from '../../../domain/entity/business-summary.entity';
import { FinancialSummaryEntity } from '../../../domain/entity/financial-summary.entity';
import { GeneralInformationEntity } from '../../../domain/entity/general-information.entity';
import { OrderEntity } from '../../../domain/entity/order.entity';
import {
  BuyOrSell,
  DebitOrCredit,
  Market,
  MarketType,
} from '../../../domain/dto/order.dto';
import { StockEntity } from 'src/modules/brokerage-order/domain/entity/stock.entity';

const generalInformationEntity: GeneralInformationEntity = {
  brokerageOrderNumber: 51198038,
  tradingFlorDate: new Date('2022-06-24'),
  clientId: '2079101',
};

export const stock: StockEntity = {
  symbol: 'HGCR11',
  specification: 'FII CSHGCRI HGCR11',
};

const ordersEntity: OrderEntity[] = [
  {
    market: Market.BOVESPA,
    buyOrSell: BuyOrSell.BUY,
    marketType: MarketType.VISTA,
    stock,
    quantity: 100,
    price: 1850,
    total: 185000,
    debitOrCredit: DebitOrCredit.DEBIT,
  },
];

const businessSummaryEntity: BusinessSummaryEntity = {
  debentures: 0,
  sellInCash: 0,
  buyInCash: 185000,
  optionsBuy: 0,
  optionsSell: 0,
  termOptions: 0,
  federalSecurities: 0,
  operationValues: 185000,
};

const financialSummaryEntity: FinancialSummaryEntity = {
  clearing: {
    operationsNetValue: 185000,
    settlementFee: 46,
    registryFee: 0,
    totalCblc: 185046,
  },
  exchange: {
    termOrOptionsFee: 0,
    anaFee: 0,
    fees: 9,
    total: 9,
  },
  operationalCosts: {
    operationalFee: 490,
    execution: 0,
    custody: 0,
    taxes: 52,
    irrf: 0,
    others: 19,
    totalCosts: 561,
  },
  netDate: new Date('2022-06-28'),
  netTotalValue: 185616,
  netDebitOrCredit: DebitOrCredit.DEBIT,
};

export const brokerageOrderEntity = new BrokerageOrderEntity(
  generalInformationEntity,
  ordersEntity,
  businessSummaryEntity,
  financialSummaryEntity,
);
