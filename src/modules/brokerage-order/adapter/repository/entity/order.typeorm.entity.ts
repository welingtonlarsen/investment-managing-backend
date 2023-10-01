import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { BrokerageOrder } from './brokerage-order.db.entity';
import { DecimalTransformer } from '../../../../../util/transformers';
import { Stock } from './stock.typeorm.entity';

export enum Market {
  BOVESPA = 'BOVESPA',
}

export enum BuyOrSell {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum MarketType {
  VISTA = 'VISTA',
}

export enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Market,
    default: Market.BOVESPA,
  })
  market: Market;

  @Column({
    type: 'enum',
    enum: BuyOrSell,
  })
  buyOrSell: BuyOrSell;

  @Column({
    type: 'enum',
    enum: MarketType,
    default: MarketType.VISTA,
  })
  marketType: MarketType;

  @ManyToOne(() => Stock, (stock) => stock.symbol, { eager: true })
  @JoinColumn({ name: 'stock_id', referencedColumnName: 'symbol' })
  stock: Stock;

  @Column()
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  total: number;

  @Column({
    type: 'enum',
    enum: DebitOrCredit,
  })
  debitOrCredit: DebitOrCredit;

  @ManyToOne((type) => BrokerageOrder, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brokerage_order_id', referencedColumnName: 'id' })
  brokerageOrder: BrokerageOrder;

  constructor(
    market: Market,
    buyOrSell: BuyOrSell,
    marketType: MarketType,
    stock: Stock,
    quantity: number,
    price: number,
    total: number,
    debitOrCredit: DebitOrCredit,
    id?: number,
  ) {
    this.id = id;
    this.market = market;
    this.buyOrSell = buyOrSell;
    this.marketType = marketType;
    this.stock = stock;
    this.quantity = quantity;
    this.price = price;
    this.total = total;
    this.debitOrCredit = debitOrCredit;
  }
}
