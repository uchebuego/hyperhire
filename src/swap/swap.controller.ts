import { Controller, Get, Param } from '@nestjs/common';
import { SwapService } from './swap.service';
import { AssetsService } from 'src/assets/assets.service';
import BigNumber from 'bignumber.js';
import { ApiTags } from '@nestjs/swagger';
import { SwapParamsDto } from './dto/swap-params.dto';

@ApiTags('Swap')
@Controller('swap')
export class SwapController {
  constructor(
    private readonly swapService: SwapService,
    private readonly assetsService: AssetsService,
  ) {}

  @Get(':source/:target/:amount')
  async swapBtc(@Param() params: SwapParamsDto) {
    const ethAsset = await this.assetsService.findBySymbol(
      params.source.toUpperCase(),
    );
    const btcAsset = await this.assetsService.findBySymbol(
      params.target.toUpperCase(),
    );

    return this.swapService.getSwapRate(
      ethAsset,
      btcAsset,
      new BigNumber(params.amount),
    );
  }
}
