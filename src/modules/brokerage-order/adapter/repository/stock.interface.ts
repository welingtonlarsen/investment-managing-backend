import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Stock } from './entity/stock.typeorm.entity';

export const STOCK_REPOSITORY_TOKEN = 'stock-repository-token';

export interface StockRepository {
  findAll(options: IPaginationOptions): Promise<Pagination<Stock>>;
}
