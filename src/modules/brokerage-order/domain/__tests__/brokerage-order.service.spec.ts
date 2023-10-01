import { Test, TestingModule } from '@nestjs/testing';
import { BrokerageOrderService } from '../brokerage-order.service';
import { BrokerageOrderTypeormRepository } from '../../adapter/repository/brokerage-order.typeorm.repository';
import { InvalidTotalNetValue } from '../error/create-brokerage-order.usecase';
import { ValidCreateBrokerageOrderDto } from './seed/valid-create-brokerage-order-dto';
import { InvalidTotalNetValueDto } from './seed/invalid-total-net-value-dto';
import { BrokerageOrderEntityFactory } from '../factory/brokerage-order-entity.factory';
import { BROKERAGE_ORDER_REPOSITORY_TOKEN } from '../../adapter/repository/brokerage-order.interface';

describe('BrokerageOrderService', () => {
  let service: BrokerageOrderService;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const brokerageOrderTypeORMRepositoryMock: BrokerageOrderTypeormRepository = {
    upsert: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrokerageOrderService,
        {
          provide: BROKERAGE_ORDER_REPOSITORY_TOKEN,
          useValue: brokerageOrderTypeORMRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BrokerageOrderService>(BrokerageOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save brokerage order', async () => {
    await service.create(ValidCreateBrokerageOrderDto);
    expect(brokerageOrderTypeORMRepositoryMock.upsert).toHaveBeenCalledWith(
      BrokerageOrderEntityFactory.from(ValidCreateBrokerageOrderDto),
    );
  });

  it.skip('should throw InvalidTotalNetValue error', async () => {
    await expect(() => service.create(InvalidTotalNetValueDto)).rejects.toThrow(
      new InvalidTotalNetValue(
        `Total net value from brokerage order 51198038 does not match to sum of all values`,
      ),
    );
  });
});
