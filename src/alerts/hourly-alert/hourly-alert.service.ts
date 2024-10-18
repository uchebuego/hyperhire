import { Injectable } from '@nestjs/common';
import { PriceService } from '../../price/price.service';
import { LessThanOrEqual } from 'typeorm';
import BigNumber from 'bignumber.js';
import { OnEvent } from '@nestjs/event-emitter';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { Price } from 'src/price/entities/price.entity';

@Injectable()
export class HourlyAlertService {
  constructor(
    private readonly priceService: PriceService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @OnEvent('price.updated')
  async checkPriceIncreaseAndNotify(price: Price): Promise<void> {
    const latestPrice = price;
    const { asset } = price;

    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const oldPrice = await this.priceService.findOne({
      where: {
        asset,
        timestamp: LessThanOrEqual(oneHourAgo),
      },
      order: { timestamp: 'DESC' },
    });

    console.log({ latestPrice, oldPrice });

    if (!latestPrice || !oldPrice) {
      return;
    }

    const priceChange = new BigNumber(latestPrice.price).minus(oldPrice.price);
    const percentageChange = priceChange.dividedBy(oldPrice.price).times(100);

    if (percentageChange.greaterThan(3)) {
      await this.mailService.send(
        this.configService.get('MAIL_RECIPIENT'),
        `Price Increase Alert for ${asset.name}`,
        'scheduled-alert',
        { asset },
      );
    }
  }
}
