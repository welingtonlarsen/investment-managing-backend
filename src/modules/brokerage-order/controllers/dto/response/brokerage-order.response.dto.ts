import { GeneralInformationResponseDto } from './general-information.response.dto';
import { OrderResponseDto } from './order.response.dto';
import { BusinessSummaryResponseDto } from './business-summary.response.dto';
import { FinancialSummaryResponseDto } from './financial-summary.response.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BrokerageOrderResponseDto {
  id?: number;

  @ValidateNested()
  @Type(() => GeneralInformationResponseDto)
  generalInformation: GeneralInformationResponseDto;

  @ValidateNested({ each: true })
  @Type(() => OrderResponseDto)
  orders: OrderResponseDto[];

  @ValidateNested()
  @Type(() => BusinessSummaryResponseDto)
  businessSummary: BusinessSummaryResponseDto;

  @ValidateNested()
  @Type(() => FinancialSummaryResponseDto)
  financialSummary: FinancialSummaryResponseDto;
}
