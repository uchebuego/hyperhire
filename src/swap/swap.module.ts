import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapController } from './swap.controller';
import { MoralisModule } from 'src/moralis/moralis.module';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [SwapService],
  controllers: [SwapController],
  imports: [MoralisModule, AssetsModule],
})
export class SwapModule {}
