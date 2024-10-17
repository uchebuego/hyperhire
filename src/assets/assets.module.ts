import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { SeedService } from './seeder/seeder.service';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService, SeedService],
  imports: [TypeOrmModule.forFeature([Asset])],
  exports: [AssetsService],
})
export class AssetsModule {}
