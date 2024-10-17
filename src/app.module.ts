import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './db/typeorm.config';
import { PriceModule } from './price/price.module';
import { AssetsModule } from './assets/assets.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PriceModule,
    AssetsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig as any),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
