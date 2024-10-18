import { Injectable, Logger } from '@nestjs/common';
import { AlertsService } from '../alerts.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Price } from 'src/price/entities/price.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AlertCheckerService {
  private readonly logger = new Logger(AlertCheckerService.name);

  constructor(
    private readonly alertsService: AlertsService,
    private readonly mailService: MailService,
  ) {}

  @OnEvent('price.updated')
  async handlePriceUpdateEvent(price: Price) {
    const alerts = await this.alertsService.findAll({
      isTriggered: false,
      asset: { id: price.asset.id },
    });

    await Promise.all(
      alerts.map(async (alert) => {
        try {
          if (price.price.greaterThanOrEqualTo(alert.targetPrice)) {
            await this.alertsService.update(alert.id, { isTriggered: true });

            this.logger.log(
              `Alert triggered for ${alert.asset.name} at price ${alert.targetPrice}`,
            );

            await this.mailService.send(
              alert.email,
              'Price Alert Triggered',
              'scheduled-alert',
              { alert },
            );
          }
        } catch (e) {
          this.logger.error(e);
        }
      }),
    );
  }
}
