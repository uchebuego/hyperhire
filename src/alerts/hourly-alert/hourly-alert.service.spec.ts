import { Test, TestingModule } from '@nestjs/testing';
import { HourlyAlertService } from './hourly-alert.service';

describe('HourlyAlertService', () => {
  let service: HourlyAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HourlyAlertService],
    }).compile();

    service = module.get<HourlyAlertService>(HourlyAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
