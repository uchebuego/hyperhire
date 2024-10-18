import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AssetsService } from 'src/assets/assets.service';
import { ConfigService } from '@nestjs/config';
import BigNumber from 'bignumber.js';
import { PriceService } from '../price.service';
import { MoralisService } from 'src/moralis/moralis.service';

@Injectable()
export class PriceFetcherService {
  private readonly logger: Logger;

  constructor(
    private readonly priceService: PriceService,
    private readonly assetsService: AssetsService,
    private readonly configService: ConfigService,
    private readonly moralisService: MoralisService,
  ) {
    this.logger = new Logger(PriceFetcherService.name);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchPrices() {
    try {
      const assets = await this.assetsService.find({ refresh: true });

      assets.forEach(async (asset) => {
        try {
          const priceData = await this.moralisService.getPrice(asset);

          this.logger.log(
            `${asset.name} - ${priceData.usdPriceFormatted} - ${new Date().toISOString()}`,
          );

          await this.priceService.savePrice(
            asset,
            new BigNumber(priceData.usdPriceFormatted),
          );
        } catch (fetchError) {
          this.logger.error(
            `Error fetching price for ${asset.name}:`,
            fetchError.message,
          );
        }
      });
    } catch (error) {
      this.logger.error('Error fetching prices:', error.message);
    }
  }
}
