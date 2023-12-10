import { Inject, Injectable } from '@nestjs/common';
import { CreateBrokerageOrderDto } from './dto/create-brokerage-order.dto';
import { BrokerageOrderEntityFactory } from './factory/brokerage-order-entity.factory';
import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  BROKERAGE_ORDER_REPOSITORY_TOKEN,
  BrokerageOrderRepository,
} from '../adapter/repository/brokerage-order.interface';
import { BrokerageOrderSummary } from './entity/brokerage-order-summary.entity';
import { BrokerageOrderEntity } from './entity/brokerage-order.entity';
import { UpdateBrokerageOrderDto } from '../controllers/dto/request/update-brokerage-order.dto';
import { BrokerageOrderResponseDto } from '../controllers/dto/response/brokerage-order.response.dto';
import { SummaryResponseDto } from '../controllers/dto/response/summary.response.dto';
import { SummaryFactory } from './factory/summary.factory';
import { CustodyService } from 'src/modules/custody/custody.service';

@Injectable()
export class BrokerageOrderService {
  constructor(
    @Inject(BROKERAGE_ORDER_REPOSITORY_TOKEN)
    private brokerageOrderRepository: BrokerageOrderRepository,
    private custodyService: CustodyService,
  ) {}

  public async create(data: CreateBrokerageOrderDto): Promise<void> {
    const brokerageOrderEntity = BrokerageOrderEntityFactory.from(data);
    await this.brokerageOrderRepository.upsert(brokerageOrderEntity);
    await this.custodyService.upsertCustody(data.orders);
  }

  public async getAllSummary(
    options: IPaginationOptions,
  ): Promise<Pagination<SummaryResponseDto, IPaginationMeta>> {
    const brokerageOrders = await this.brokerageOrderRepository.findAll(
      options,
    );
    const summaryItems = brokerageOrders.items.map((brokerageOrder) => {
      const entity = new BrokerageOrderSummary(brokerageOrder);
      return SummaryFactory.toResponseDto(entity);
    });

    return {
      ...brokerageOrders,
      items: summaryItems,
    };
  }

  public async delete(id: number): Promise<void> {
    return this.brokerageOrderRepository.delete(id);
  }

  public async getById(id: number): Promise<BrokerageOrderResponseDto> {
    const brokerageOrder = await this.brokerageOrderRepository.getById(id);
    return BrokerageOrderEntityFactory.toResponseDto(brokerageOrder);
  }

  public async update(id: number, brokerageOrder: UpdateBrokerageOrderDto) {
    const brokerageOrderEntity = {
      ...BrokerageOrderEntityFactory.from(brokerageOrder),
      id,
    } as unknown as BrokerageOrderEntity;
    return this.brokerageOrderRepository.upsert(brokerageOrderEntity);
  }
}
