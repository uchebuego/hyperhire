import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chainId: string;

  @Column({ unique: true })
  symbol: string;

  @Column({ unique: true })
  address: string;

  @Column({ default: false })
  refresh: boolean;
}
