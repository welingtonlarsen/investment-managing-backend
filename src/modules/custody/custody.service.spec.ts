import { Test, TestingModule } from '@nestjs/testing';
import { CustodyService } from './custody.service';

describe('CustodyService', () => {
  let service: CustodyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustodyService],
    }).compile();

    service = module.get<CustodyService>(CustodyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
