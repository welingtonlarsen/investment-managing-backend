import { GeneralInformationDto } from './general-information.dto';
import { OrderDto } from './order.dto';
import { BusinessSummary } from './business-summary.dto';
import { FinancialSummary } from './financial-summary.dto';

export type CreateBrokerageOrderDto = {
  generalInformation: GeneralInformationDto;
  orders: OrderDto[];
  businessSummary: BusinessSummary;
  financialSummary: FinancialSummary;
};
