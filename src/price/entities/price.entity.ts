import BigNumber from 'bignumber.js';
import { Asset } from 'src/assets/entities/asset.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Asset)
  asset: Asset;

  @Column('varchar', {
    transformer: {
      from: (value: string) => new BigNumber(value),
      to: (value: BigNumber) => value.toString(),
    },
  })
  price: BigNumber;

  @CreateDateColumn()
  timestamp: Date;
}
