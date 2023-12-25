import { Controller, Get, Param } from '@nestjs/common';
import { CustodyService } from './custody.service';

@Controller('custody')
export class CustodyController {
  constructor(private custodyService: CustodyService) {}

  @Get()
  async getCurrentCustody() {
    return await this.custodyService.getCurrentCustody();
  }
}
