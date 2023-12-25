import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stock } from '../brokerage-order/adapter/repository/entity/stock.typeorm.entity';
import { DecimalTransformer } from '../../util/transformers';

@Entity()
export class Custody {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Stock, (stock) => stock.symbol, { eager: true })
  @JoinColumn({ name: 'stock_id', referencedColumnName: 'symbol' })
  stock?: Stock;

  @Column()
  quantity?: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  averagePrice?: number;

  @Column()
  buyQuantity?: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  buyPrice: number;

  @Column({ type: 'date' })
  createdAt: Date;

  constructor(
    stock: Stock,
    quantity: number,
    averagePrice: number,
    buyQuantity: number,
    buyPrice: number,
    createdAt: Date,
  ) {
    this.stock = stock;
    this.quantity = quantity;
    this.averagePrice = averagePrice;
    this.buyPrice = buyPrice;
    this.buyQuantity = buyQuantity;
    this.createdAt = createdAt;
  }
}
