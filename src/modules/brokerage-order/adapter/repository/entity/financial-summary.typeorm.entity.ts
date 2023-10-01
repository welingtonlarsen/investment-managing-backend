import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DecimalTransformer } from '../../../../../util/transformers';

@Entity()
export class Clearing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operationsNetValue: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  settlementFee: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  registryFee: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  totalCblc: number;

  constructor(
    operationsNetValue: number,
    settlementFee: number,
    registryFee: number,
    totalCblc: number,
    id: number,
  ) {
    this.operationsNetValue = operationsNetValue;
    this.settlementFee = settlementFee;
    this.registryFee = registryFee;
    this.totalCblc = totalCblc;
    this.id = id;
  }
}

@Entity()
export class Exchange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  termOrOptionsFee: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  anaFee: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  fees: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  total: number;

  constructor(
    termOrOptionsFee: number,
    anaFee: number,
    fees: number,
    total: number,
    id?: number,
  ) {
    this.termOrOptionsFee = termOrOptionsFee;
    this.anaFee = anaFee;
    this.fees = fees;
    this.total = total;
    this.id = id;
  }
}

@Entity()
export class OperationalCosts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  operationalFee: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  execution: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  custody: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  taxes: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  irrf: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  others: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  totalCosts: number;

  constructor(
    operationalFee: number,
    execution: number,
    custody: number,
    taxes: number,
    irrf: number,
    others: number,
    totalCosts: number,
    id?: number,
  ) {
    this.operationalFee = operationalFee;
    this.execution = execution;
    this.custody = custody;
    this.taxes = taxes;
    this.irrf = irrf;
    this.others = others;
    this.totalCosts = totalCosts;
    this.id = id;
  }
}

export enum DebitOrCredit {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

@Entity()
export class FinancialSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Clearing, { cascade: true, eager: true })
  @JoinColumn()
  clearing: Clearing;

  @OneToOne(() => Exchange, { cascade: true, eager: true })
  @JoinColumn()
  exchange: Exchange;

  @OneToOne(() => OperationalCosts, { cascade: true, eager: true })
  @JoinColumn()
  operationalCosts: OperationalCosts;

  @Column({ type: 'date' })
  netDate: Date;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  netTotalValue: number;

  @Column({
    type: 'enum',
    enum: DebitOrCredit,
  })
  netDebitOrCredit: DebitOrCredit;

  constructor(
    clearing: Clearing,
    exchange: Exchange,
    operationalCosts: OperationalCosts,
    netDate: Date,
    netTotalValue: number,
    netDebitOrCredit: DebitOrCredit,
    id?: number,
  ) {
    this.id = id;
    this.clearing = clearing;
    this.exchange = exchange;
    this.operationalCosts = operationalCosts;
    this.netDate = netDate;
    this.netTotalValue = netTotalValue;
    this.netDebitOrCredit = netDebitOrCredit;
  }
}
