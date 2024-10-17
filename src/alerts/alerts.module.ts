import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { AssetsModule } from 'src/assets/assets.module';
import { AlertCheckerService } from './alert-checker/alert-checker.service';

@Module({
  controllers: [AlertsController],
  providers: [AlertsService, AlertCheckerService],
  imports: [AssetsModule, TypeOrmModule.forFeature([Alert])],
})
export class AlertsModule {}
