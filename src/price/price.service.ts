import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { AssetsService } from 'src/assets/assets.service';
import { Asset } from 'src/assets/entities/asset.entity';
import { Price } from 'src/price/entities/price.entity';
import { Repository, MoreThan, FindOneOptions } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    private eventEmitter: EventEmitter2,
    private assetsServie: AssetsService,
  ) {}

  async findOne(options: FindOneOptions<Price>): Promise<Price> {
    const priceData = await this.priceRepository.findOne(options);

    return priceData;
  }

  async savePrice(asset: Asset, price: BigNumber): Promise<Price> {
    asset = await this.assetsServie.findOne(asset);

    const newPrice = this.priceRepository.create({
      price,
      asset,
    });

    const savedPrice = await this.priceRepository.save(newPrice);

    this.eventEmitter.emit('price.updated', savedPrice);

    return savedPrice;
  }

  async getHourlyPrices(
    asset: Asset,
  ): Promise<{ hour: Date; averagePrice: number }[]> {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const hourlyPrices = await this.priceRepository
      .createQueryBuilder('price')
      .select("DATE_TRUNC('hour', price.timestamp) AS hour")
      .addSelect('AVG(CAST(price.price AS float))', 'averagePrice')
      .where('price.assetId = :assetId', { assetId: asset.id })
      .andWhere('price.timestamp >= :oneDayAgo', { oneDayAgo })
      .groupBy("DATE_TRUNC('hour', price.timestamp)")
      .orderBy('hour', 'ASC')
      .getRawMany();

    return hourlyPrices.map((entry) => ({
      hour: new Date(entry.hour),
      averagePrice: parseFloat(entry.averagePrice),
    }));
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
