import { ValidateNested } from "class-validator";
import { Month } from "../reports.service";
import { CustodyResponseDTO } from "./custody.response.dto";

export class AnnualReportResponseDTO {
    @ValidateNested()
    months: Record<Month, {buy: any, sell: any, custody: CustodyResponseDTO[]}>
    tradedStockSymbols: any[]
}