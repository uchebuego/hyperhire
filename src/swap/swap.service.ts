import { Injectable, NotFoundException } from '@nestjs/common';
import { MoralisService } from '../moralis/moralis.service';
import { Asset } from 'src/assets/entities/asset.entity';
import BigNumber from 'bignumber.js';

@Injectable()
export class SwapService {
  private static readonly FEE_PERCENTAGE = 0.03;

  constructor(private readonly moralisService: MoralisService) {}

  async getSwapRate(
    fromAsset: Asset,
    toAsset: Asset,
    amount: BigNumber,
  ): Promise<{
    fromAsset: string;
    toAsset: string;
    amount: string;
    convertedAmount: string;
    fees: { [key: string]: string; USD: string };
  }> {
    const [fromAssetPriceData, toAssetPriceData] = await Promise.all([
      this.moralisService.getPrice(fromAsset),
      this.moralisService.getPrice(toAsset),
    ]);

    if (!fromAssetPriceData || !toAssetPriceData) {
      throw new NotFoundException(
        `Price data for ${fromAsset.symbol} or ${toAsset.symbol} not found.`,
      );
    }

    const fromAssetPrice = new BigNumber(fromAssetPriceData.nativePrice.value);
    const toAssetPrice = new BigNumber(toAssetPriceData.nativePrice.value);

    const conversionRate = toAssetPrice.dividedBy(fromAssetPrice);
    const convertedAmount = amount.dividedBy(conversionRate);

    const feeFromAsset = amount
      .times(SwapService.FEE_PERCENTAGE)
      .dividedBy(100);

    const feeUsd = feeFromAsset
      .times(new BigNumber(fromAssetPriceData.usdPriceFormatted))
      .toFixed(6);

    return {
      fromAsset: fromAsset.symbol,
      toAsset: toAsset.symbol,
      amount: amount.toString(),
      convertedAmount: convertedAmount.toString(),
      fees: {
        [fromAsset.symbol]: feeFromAsset.toString(),
        USD: feeUsd,
      },
    };
  }
}
