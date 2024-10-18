import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { AssetsModule } from 'src/assets/assets.module';
import { AlertCheckerService } from './alert-checker/alert-checker.service';
import { HourlyAlertService } from './hourly-alert/hourly-alert.service';
import { MailModule } from 'src/mail/mail.module';
import { PriceModule } from 'src/price/price.module';

@Module({
  controllers: [AlertsController],
  providers: [AlertsService, AlertCheckerService, HourlyAlertService],
  imports: [
    AssetsModule,
    MailModule,
    PriceModule,
    TypeOrmModule.forFeature([Alert]),
  ],
})
export class AlertsModule {}
