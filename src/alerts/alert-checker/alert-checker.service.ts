import { Injectable, Logger } from '@nestjs/common';
import { AlertsService } from '../alerts.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Price } from 'src/price/entities/price.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AlertCheckerService {
  private readonly logger = new Logger(AlertCheckerService.name);

  constructor(
    private readonly alertsService: AlertsService,
    private readonly mailerService: MailerService,
  ) {}

  @OnEvent('price.updated')
  async handlePriceUpdateEvent(price: Price) {
    const alerts = await this.alertsService.findAll({
      isTriggered: false,
      asset: { id: price.asset.id },
    });

    for (const alert of alerts) {
      if (price.price.greaterThanOrEqualTo(alert.targetPrice)) {
        await this.alertsService.update(alert.id, { isTriggered: true });

        this.logger.log(
          `Alert triggered for ${alert.asset.name} at price ${alert.targetPrice}`,
        );

        await this.mailerService.sendMail({
          to: alert.email,
          subject: 'Price Alert Triggered',
          text: `The price of ${alert.asset.name} has reached ${alert.targetPrice}.`,
        });
      }
    }
  }
}
