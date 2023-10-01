import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.typeorm.entity';

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
}
