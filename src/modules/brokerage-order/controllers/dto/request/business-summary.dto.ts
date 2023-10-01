import { IsNumber } from 'class-validator';
import { MultiplyBy100 } from '../../../../../decorators/multiply-by-100';

export class BusinessSummary {
  id?: number;

  @IsNumber()
  @MultiplyBy100()
  debentures: number;

  @IsNumber()
  @MultiplyBy100()
  sellInCash: number;

  @IsNumber()
  @MultiplyBy100()
  buyInCash: number;

  @IsNumber()
  @MultiplyBy100()
  optionsBuy: number;

  @IsNumber()
  @MultiplyBy100()
  optionsSell: number;

  @IsNumber()
  @MultiplyBy100()
  termOptions: number;

  @IsNumber()
  @MultiplyBy100()
  federalSecurities: number;

  @IsNumber()
  @MultiplyBy100()
  operationValues: number;
}
