import { Module } from '@nestjs/common';
import { PriceService } from './services/price/price.service';
import { PriceFetcherService } from './services/price-fetcher/price-fetcher.service';
import { AssetsModule } from 'src/assets/assets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';

@Module({
  providers: [PriceService, PriceFetcherService],
  imports: [AssetsModule, TypeOrmModule.forFeature([Price])],
})
export class PriceModule {}
