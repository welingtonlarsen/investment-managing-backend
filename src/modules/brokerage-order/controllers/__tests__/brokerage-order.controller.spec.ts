import { Test, TestingModule } from '@nestjs/testing';
import { BrokerageOrderController } from '../brokerage-order.controller';
import { BrokerageOrderService } from '../../domain/brokerage-order.service';
import { CreateBrokerageOrderDto } from '../dto/request/create-brokerage-order.dto';

describe('BrokerageOrderController', () => {
  let controller: BrokerageOrderController;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const brokerageOrderServiceMock: BrokerageOrderService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerageOrderController],
      providers: [
        {
          provide: BrokerageOrderService,
          useValue: brokerageOrderServiceMock,
        },
      ],
    }).compile();

    controller = module.get<BrokerageOrderController>(BrokerageOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call brokerage order service with request payload', () => {
    //brokerageOrderServiceMock.create = jest.fn().mockResolvedValue(null);
    const serviceSpy = jest
      .spyOn(brokerageOrderServiceMock, 'create')
      .mockResolvedValue(null);

    controller.create({} as CreateBrokerageOrderDto);

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
