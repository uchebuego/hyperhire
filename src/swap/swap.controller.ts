import { Controller, Get, Param } from '@nestjs/common';
import { SwapService } from './swap.service';
import { AssetsService } from 'src/assets/assets.service';
import BigNumber from 'bignumber.js';

@Controller('swap')
export class SwapController {
  constructor(
    private readonly swapService: SwapService,
    private readonly assetsService: AssetsService,
  ) {}

  @Get(':source/:target/:amount')
  async swapBtc(
    @Param('source') source: string,
    @Param('target') target: string,
    @Param('amount') amount: string,
  ) {
    const ethAsset = await this.assetsService.findBySymbol(
      source.toUpperCase(),
    );
    const btcAsset = await this.assetsService.findBySymbol(
      target.toUpperCase(),
    );

    return this.swapService.getSwapRate(
      ethAsset,
      btcAsset,
      new BigNumber(amount),
    );
  }
}
