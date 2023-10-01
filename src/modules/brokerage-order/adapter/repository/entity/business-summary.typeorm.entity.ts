import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalTransformer } from '../../../../../util/transformers';

@Entity()
export class BusinessSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  debentures: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  sellInCash: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  buyInCash: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  optionsBuy: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  optionsSell: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  termOptions: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  federalSecurities: number;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  operationValues: number;

  constructor(
    debentures: number,
    sellInCash: number,
    buyInCash: number,
    optionsBuy: number,
    optionsSell: number,
    termOptions: number,
    federalSecurities: number,
    operationValues: number,
    id?: number,
  ) {
    this.id = id;
    this.debentures = debentures;
    this.sellInCash = sellInCash;
    this.buyInCash = buyInCash;
    this.optionsBuy = optionsBuy;
    this.optionsSell = optionsSell;
    this.termOptions = termOptions;
    this.federalSecurities = federalSecurities;
    this.operationValues = operationValues;
  }
}
