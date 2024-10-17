import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { Price } from 'src/price/entities/price.entity';
import { Repository, MoreThan } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  async savePrice(asset_id: number, price: BigNumber): Promise<Price> {
    const newPrice = this.priceRepository.create({ price, asset: asset_id });
    return this.priceRepository.save(newPrice);
  }

  async getPricesForLast24Hours(): Promise<Price[]> {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);
    return this.priceRepository.find({
      where: { timestamp: MoreThan(oneDayAgo) },
      order: { timestamp: 'ASC' },
    });
  }
}
