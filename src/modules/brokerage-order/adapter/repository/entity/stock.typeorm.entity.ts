import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.typeorm.entity';
import { Custody } from '../../../../custody/custody.entity';

@Entity()
export class Stock {
  @PrimaryColumn({
    length: 6,
  })
  symbol: string;

  @Column()
  specification: string;

  @OneToMany(() => Order, (order) => order.stock)
  orders: Order[];

  @OneToMany(() => Custody, (custody) => custody.stock)
  custody: Custody[];

  constructor(
    symbol: string,
    specification: string,
    orders: Order[],
    custody: Custody[],
  ) {
    this.symbol = symbol;
    this.specification = specification;
    this.orders = orders;
    this.custody = custody;
  }
}
