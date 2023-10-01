import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { BrokerageOrderEntity } from '../../domain/entity/brokerage-order.entity';
import { BrokerageOrder } from './entity/brokerage-order.db.entity';

export const BROKERAGE_ORDER_REPOSITORY_TOKEN =
  'brokerage-order-repository-token';

export interface BrokerageOrderRepository {
  upsert(entity: BrokerageOrderEntity): Promise<void>;

  findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<BrokerageOrderEntity>>;

  delete(id: number): Promise<void>;

  getById(id: number): Promise<BrokerageOrderEntity>;

  update(
    id: number,
    brokerageOrderEntity: BrokerageOrderEntity,
  ): Promise<BrokerageOrderEntity>;
}
