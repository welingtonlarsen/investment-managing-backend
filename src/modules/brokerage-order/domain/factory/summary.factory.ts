import { BrokerageOrderSummary } from '../entity/brokerage-order-summary.entity';
import { SummaryResponseDto } from '../../controllers/dto/response/summary.response.dto';
import { plainToClass } from 'class-transformer';

export class SummaryFactory {
  static toResponseDto(entity: BrokerageOrderSummary): SummaryResponseDto {
    return plainToClass(SummaryResponseDto, entity);
  }
}
