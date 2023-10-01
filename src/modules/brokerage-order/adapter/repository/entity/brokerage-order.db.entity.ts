import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GeneralInformation } from './general-information.typeorm.entity';
import { Order } from './order.typeorm.entity';
import { BusinessSummary } from './business-summary.typeorm.entity';
import { FinancialSummary } from './financial-summary.typeorm.entity';

@Entity()
export class BrokerageOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => GeneralInformation, { cascade: true, eager: true })
  @JoinColumn()
  generalInformation: GeneralInformation;

  @OneToMany((type) => Order, (order) => order.brokerageOrder, {
    cascade: true,
    eager: true,
  })
  orders: Order[];

  @OneToOne(() => BusinessSummary, { cascade: true, eager: true })
  @JoinColumn()
  businessSummary: BusinessSummary;

  @OneToOne(() => FinancialSummary, { cascade: true, eager: true })
  @JoinColumn()
  financialSummary: FinancialSummary;

  constructor(
    generalInformation: GeneralInformation,
    orders: Order[],
    businessSummary: BusinessSummary,
    financialSummary: FinancialSummary,
    id?: number,
  ) {
    this.id = id;
    this.generalInformation = generalInformation;
    this.orders = orders;
    this.businessSummary = businessSummary;
    this.financialSummary = financialSummary;
  }
}
