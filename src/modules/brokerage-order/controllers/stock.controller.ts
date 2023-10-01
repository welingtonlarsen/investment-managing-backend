import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StockService } from '../domain/stock.service';

@Controller('stocks')
export class StockController {
  constructor(private getStockService: StockService) {}

  @Get()
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.getStockService.getAll({ page, limit });
  }
}
