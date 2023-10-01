import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneralInformationDto } from './general-information.dto';
import { OrderDto } from './order.dto';
import { BusinessSummary } from './business-summary.dto';
import { FinancialSummary } from './financial-summary.dto';

export class CreateBrokerageOrderDto {
  @IsObject()
  @ValidateNested()
  @Type(() => GeneralInformationDto)
  generalInformation: GeneralInformationDto;

  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orders: OrderDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => BusinessSummary)
  businessSummary: BusinessSummary;

  @IsObject()
  @ValidateNested()
  @Type(() => FinancialSummary)
  financialSummary: FinancialSummary;
}
