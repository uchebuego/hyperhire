import { ApiProperty } from '@nestjs/swagger';

export class SwapParamsDto {
  @ApiProperty({
    description: 'Source asset symbol (e.g., BTC)',
    example: 'ETH',
  })
  source: string;

  @ApiProperty({
    description: 'Target asset symbol (e.g., ETH)',
    example: 'BTC',
  })
  target: string;

  @ApiProperty({
    description: 'Amount to swap',
    example: '1500',
  })
  amount: string;
}
