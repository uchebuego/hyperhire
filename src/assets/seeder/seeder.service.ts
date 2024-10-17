import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AssetsService } from '../assets.service';
import { CreateAssetDto } from '../dto/create-asset.dto';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly assetsService: AssetsService) {}

  async onModuleInit() {
    await this.seedAssets();
  }

  private async seedAssets() {
    const assets: CreateAssetDto[] = [
      {
        name: 'Ethereum',
        chainId: '0x1',
        symbol: 'ETH',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      },
      {
        name: 'Polygon',
        chainId: '0x1',
        address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
        symbol: 'ETH',
      },
    ];

    assets.forEach(async (asset) => {
      const existingAsset = await this.assetsService.findByName(asset.name);

      if (!existingAsset) {
        await this.assetsService.create(asset);
        this.logger.log(`Seeded asset: ${asset.name}`);
      } else {
        this.logger.log(`Asset already exists: ${asset.name}`);
      }
    });
  }
}
