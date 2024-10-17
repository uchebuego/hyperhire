import { Controller, Get } from '@nestjs/common';
import { PriceService } from './services/price/price.service';
import { AssetsService } from 'src/assets/assets.service';

@Controller('prices')
export class PriceController {
  constructor(
    private readonly priceService: PriceService,
    private readonly assetsService: AssetsService,
  ) {}

  @Get()
  async getHourlyPrices() {
    const assets = await this.assetsService.find();

    const pricesEntries = await Promise.all(
      assets.map(async (asset) => {
        const hourlyPrices = await this.priceService.getHourlyPrices(asset);
        return [asset.symbol, hourlyPrices] as const;
      }),
    );

    const pricesByAssetName = Object.fromEntries(pricesEntries);

    return pricesByAssetName;
  }
}
