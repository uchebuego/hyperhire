import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chainId: string;

  @Column()
  symbol: string;

  @Column()
  address: string;

  @Column({ default: false })
  refresh: boolean;
}
