import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty({
    description: 'The unique identifier for the asset',
    example: 'ETH',
  })
  assetSymbol: string;

  @ApiProperty({
    description: 'The target price for the alert',
    example: 2650,
  })
  targetPrice: number;

  @ApiProperty({
    description: 'The email address to send alerts to',
    example: 'hyperhire_assignment@hyperhire.in',
  })
  email: string;
}
