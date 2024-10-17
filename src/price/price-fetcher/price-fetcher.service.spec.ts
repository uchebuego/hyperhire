import { Test, TestingModule } from '@nestjs/testing';
import { PriceFetcherService } from './price-fetcher.service';

describe('PriceFetcherService', () => {
  let service: PriceFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceFetcherService],
    }).compile();

    service = module.get<PriceFetcherService>(PriceFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
