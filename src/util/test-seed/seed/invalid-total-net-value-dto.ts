import { ValidCreateBrokerageOrderDto } from './valid-create-brokerage-order-dto';
import { DebitOrCredit } from '../../../modules/brokerage-order/domain/dto/financial-summary.dto';

export const InvalidTotalNetValueDto = {
  ...ValidCreateBrokerageOrderDto,
  financialSummary: {
    ...ValidCreateBrokerageOrderDto.financialSummary,
    netTotalValue: 999.99,
    netDebitOrCredit: DebitOrCredit.DEBIT,
  },
};
