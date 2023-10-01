import { DivideBy100 } from '../../../../../decorators/divide-by-100';

export class BusinessSummaryResponseDto {
  id?: number;

  @DivideBy100()
  debentures: number;

  @DivideBy100()
  sellInCash: number;

  @DivideBy100()
  buyInCash: number;

  @DivideBy100()
  optionsBuy: number;

  @DivideBy100()
  optionsSell: number;

  @DivideBy100()
  termOptions: number;

  @DivideBy100()
  federalSecurities: number;

  @DivideBy100()
  operationValues: number;

  constructor(props: BusinessSummaryResponseDto) {
    Object.assign(this, props);
  }
}
