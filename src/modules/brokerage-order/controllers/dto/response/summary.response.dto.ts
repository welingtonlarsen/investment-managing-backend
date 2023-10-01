import { DebitOrCredit } from '../../../domain/entity/order.entity';
import { DivideBy100 } from '../../../../../decorators/divide-by-100';

export class SummaryResponseDto {
  readonly id: number;

  readonly date: Date;

  readonly exchange: string;

  @DivideBy100()
  readonly purchases: number;

  @DivideBy100()
  readonly sales: number;

  @DivideBy100()
  readonly costs: number;

  @DivideBy100()
  readonly net: number;

  readonly debitOrCredit: DebitOrCredit;
}
