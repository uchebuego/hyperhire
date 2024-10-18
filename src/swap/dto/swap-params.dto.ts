import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumberString } from 'class-validator';

export class SwapParamsDto {
  @ApiProperty({
    description: 'Source asset symbol (e.g., BTC)',
    example: 'ETH',
  })
  @IsString()
  source: string;

  @ApiProperty({
    description: 'Target asset symbol (e.g., ETH)',
    example: 'BTC',
  })
  @IsString()
  target: string;

  @ApiProperty({
    description: 'Amount to swap',
    example: '1500',
  })
  @IsNumberString()
  amount: string;
}
