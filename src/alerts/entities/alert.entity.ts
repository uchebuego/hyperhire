import { Asset } from 'src/assets/entities/asset.entity';
import { Price } from 'src/price/entities/price.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Asset)
  asset: Asset;

  @Column('decimal')
  targetPrice: number;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isTriggered: boolean;

  @OneToMany(() => Price, (price) => price.asset, { eager: true })
  prices: Price[];
}
