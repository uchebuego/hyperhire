import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PriceService } from '../price/price.service';
import { AssetsService } from 'src/assets/assets.service';
import Moralis from 'moralis';
import { ConfigService } from '@nestjs/config';
import BigNumber from 'bignumber.js';

@Injectable()
export class PriceFetcherService {
  private readonly logger: Logger;
  private readonly moralisApiKey: string;

  constructor(
    private readonly priceService: PriceService,
    private readonly assetsService: AssetsService,
    private readonly configService: ConfigService,
  ) {
    this.moralisApiKey = this.configService.get('MORALIS_API_KEY');
    this.logger = new Logger(PriceFetcherService.name);

    Moralis.start({ apiKey: this.moralisApiKey }).then(() => {
      this.logger.log('Moralis Initialised');
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchPrices() {
    try {
      const assets = await this.assetsService.findAll();

      assets.forEach(async (asset) => {
        try {
          const response = await Moralis.EvmApi.token.getTokenPrice({
            chain: asset.chainId,
            address: asset.address,
          });

          this.logger.log(
            `${asset.name} - ${response.raw.usdPriceFormatted} - ${new Date().toISOString()}`,
          );

          await this.priceService.savePrice(
            asset,
            new BigNumber(response.raw.usdPriceFormatted),
          );

          await this.priceService.checkPriceIncreaseAndNotify(asset);
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
