import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(
    emailAddress: string,
    subject: string,
    template: string,
    context: Record<string, any>,
  ) {
    await this.mailerService.sendMail({
      to: emailAddress,
      subject,
      template,
      context,
    });
  }
}
