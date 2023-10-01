import { BrokerageOrder } from '../entity/brokerage-order.db.entity';
import { BrokerageOrderEntity } from '../../../domain/entity/brokerage-order.entity';

export class BrokerageOrderFactory {
  static parseToBrokerageOrderDomain(
    brokerageOrderDbEntity: BrokerageOrder,
  ): BrokerageOrderEntity {
    const {
      id,
      generalInformation,
      orders,
      businessSummary,
      financialSummary,
    } = brokerageOrderDbEntity;
    return new BrokerageOrderEntity(
      generalInformation,
      orders,
      businessSummary,
      financialSummary,
      id,
    );
  }
}
