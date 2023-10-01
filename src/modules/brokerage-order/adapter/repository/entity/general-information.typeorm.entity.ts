import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GeneralInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brokerageOrderNumber: number;

  @Column({ type: 'date' })
  tradingFlorDate: Date;

  @Column()
  clientId: string;

  constructor(
    brokerageOrderNumber: number,
    tradingFlorDate: Date,
    clientId: string,
    id?: number,
  ) {
    this.id = id;
    this.brokerageOrderNumber = brokerageOrderNumber;
    this.tradingFlorDate = tradingFlorDate;
    this.clientId = clientId;
  }
}
