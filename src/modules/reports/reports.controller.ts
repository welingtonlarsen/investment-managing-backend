import { Controller, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AnnualReportResponseDTO } from './dto/annual-report.response.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post(':year')
  generate(@Param('year') year: number): Promise<AnnualReportResponseDTO> {
    return this.reportsService.generateAnnual(year);
  }
}
