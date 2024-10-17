import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { Asset } from 'src/assets/entities/asset.entity';
import { Price } from 'src/price/entities/price.entity';
import { Repository, MoreThan, LessThanOrEqual } from 'typeorm';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async savePrice(asset: Asset, price: BigNumber): Promise<Price> {
    const newPrice = this.priceRepository.create({
      price,
      asset: { id: asset.id },
    });
    return this.priceRepository.save(newPrice);
  }

  async checkPriceIncreaseAndNotify(asset: Asset): Promise<void> {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const [latestPrice, oldPrice] = await Promise.all([
      this.priceRepository.findOne({
        where: { asset: { id: asset.id } },
        order: { timestamp: 'DESC' },
      }),
      this.priceRepository.findOne({
        where: {
          asset: { id: asset.id },
          timestamp: LessThanOrEqual(oneHourAgo),
        },
        order: { timestamp: 'DESC' },
      }),
    ]);

    if (!latestPrice || !oldPrice) {
      return;
    }

    const priceChange = new BigNumber(latestPrice.price).minus(oldPrice.price);
    const percentageChange = priceChange.dividedBy(oldPrice.price).times(100);

    if (percentageChange.greaterThan(3)) {
      await this.sendPriceIncreaseNotification(asset, percentageChange);
    }
  }

  private async sendPriceIncreaseNotification(
    asset: Asset,
    percentageChange: BigNumber,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: this.configService.get('MAIL_RECIPIENT'),
      subject: `Price Increase Alert for ${asset.name}`,
      text: `The price of ${asset.name} has increased by ${percentageChange.toFixed(2)}% in the last hour.`,
      html: `<p>The price of <strong>${asset.name}</strong> has increased by <strong>${percentageChange.toFixed(2)}%</strong> in the last hour.</p>`,
    });
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
