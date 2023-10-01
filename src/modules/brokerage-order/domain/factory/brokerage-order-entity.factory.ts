import { CreateBrokerageOrderDto } from '../dto/create-brokerage-order.dto';
import { BrokerageOrderEntity } from '../entity/brokerage-order.entity';
import { BrokerageOrderResponseDto } from '../../controllers/dto/response/brokerage-order.response.dto';
import { BusinessSummaryResponseDto } from '../../controllers/dto/response/business-summary.response.dto';
import { plainToClass } from 'class-transformer';

export class BrokerageOrderEntityFactory {
  static from(dto: CreateBrokerageOrderDto): BrokerageOrderEntity {
    const {
      orders: ordersDto,
      businessSummary: businessSummaryDto,
      financialSummary: financialSummaryDto,
    } = dto;

    const orders = ordersDto.map((order) => {
      return {
        ...order,
        stock: { symbol: order.symbol, specification: undefined },
      };
    });

    return new BrokerageOrderEntity(
      dto.generalInformation,
      orders,
      businessSummaryDto,
      financialSummaryDto,
    );
  }

  static toResponseDto(
    entity: BrokerageOrderEntity,
  ): BrokerageOrderResponseDto {
    return plainToClass(BrokerageOrderResponseDto, entity);
  }
}
