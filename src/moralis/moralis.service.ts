import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Moralis from 'moralis';
import { Asset } from 'src/assets/entities/asset.entity';

@Injectable()
export class MoralisService {
  private readonly logger: Logger;
  private readonly moralisApiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(MoralisService.name);
    this.moralisApiKey = this.configService.get('MORALIS_API_KEY');

    Moralis.start({ apiKey: this.moralisApiKey }).then(() => {
      this.logger.log('Moralis Initialised');
    });
  }

  async getPrice(asset: Asset) {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain: asset.chainId,
      address: asset.address,
    });

    return response.raw;
  }
}
