import { GeneralInformationEntity } from './general-information.entity';
import { OrderEntity } from './order.entity';
import { BusinessSummaryEntity } from './business-summary.entity';
import { FinancialSummaryEntity } from './financial-summary.entity';

export class BrokerageOrderEntity {
  constructor(
    readonly generalInformation: GeneralInformationEntity,
    readonly orders: OrderEntity[],
    readonly businessSummary: BusinessSummaryEntity,
    readonly financialSummary: FinancialSummaryEntity,
    readonly id?: number,
  ) {}
}
