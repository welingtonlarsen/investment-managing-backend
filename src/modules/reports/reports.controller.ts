import { Controller, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post(':year')
  generate(@Param('year') year: number) {
    return this.reportsService.generateAnnual(year);
  }
}
