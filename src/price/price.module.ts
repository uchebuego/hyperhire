import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { AssetsModule } from 'src/assets/assets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { PriceController } from './price.controller';
import { PriceFetcherService } from './price-fetcher/price-fetcher.service';
import { MoralisModule } from 'src/moralis/moralis.module';

@Module({
  providers: [PriceService, PriceFetcherService],
  imports: [AssetsModule, TypeOrmModule.forFeature([Price]), MoralisModule],
  controllers: [PriceController],
})
export class PriceModule {}
