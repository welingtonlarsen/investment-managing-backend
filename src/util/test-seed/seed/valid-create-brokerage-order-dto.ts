import {
  BuyOrSell,
  DebitOrCredit,
  Market,
  MarketType,
} from '../../../modules/brokerage-order/domain/dto/order.dto';

export const ValidCreateBrokerageOrderDto = {
  generalInformation: {
    brokerageOrderNumber: 51198038,
    tradingFlorDate: new Date('2022-06-24'),
    clientId: '2079101',
  },
  orders: [
    {
      market: Market.BOVESPA,
      buyOrSell: BuyOrSell.BUY,
      marketType: MarketType.VISTA,
      title: 'SANEPAR UNT N2',
      quantity: 100,
      price: 18.5,
      total: 1850.0,
      debitOrCredit: DebitOrCredit.DEBIT,
    },
  ],
  businessSummary: {
    debentures: 0.0,
    sellInCash: 0.0,
    buyInCash: 1850.0,
    optionsBuy: 0.0,
    optionsSell: 0.0,
    termOptions: 0.0,
    federalSecurities: 0.0,
    operationValues: 1850.0,
  },
  financialSummary: {
    clearing: {
      operationsNetValue: 1850.0,
      settlementFee: 0.46,
      registryFee: 0.0,
      totalCblc: 1850.46,
    },
    exchange: {
      termOrOptionsFee: 0.0,
      anaFee: 0.0,
      fees: 0.09,
      total: 0.09,
    },
    operationalCosts: {
      operationalFee: 4.9,
      execution: 0.0,
      custody: 0.0,
      taxes: 0.52,
      irrf: 0.0,
      others: 0.19,
      totalCosts: 5.61,
    },
    netDate: new Date('2022-06-28'),
    netTotalValue: 1856.16,
    netDebitOrCredit: DebitOrCredit.DEBIT,
  },
};
