import { Asset } from 'src/assets/entities/asset.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Asset, { eager: true })
  asset: Asset;

  @Column('decimal')
  targetPrice: number;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isTriggered: boolean;
}
