import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './db/typeorm.config';
import { PriceModule } from './price/price.module';
import { AssetsModule } from './assets/assets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AlertsModule } from './alerts/alerts.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SwapModule } from './swap/swap.module';
import { MoralisModule } from './moralis/moralis.module';

@Module({
  imports: [
    PriceModule,
    AssetsModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeormConfig as any),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('MAIL_TRANSPORT'),
        defaults: {
          from: '"Casmir Blockchain Dev" <mail@chuchu.dev>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AlertsModule,
    SwapModule,
    MoralisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
