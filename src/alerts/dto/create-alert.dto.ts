import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail, Min } from 'class-validator';

export class CreateAlertDto {
  @ApiProperty({
    description: 'The unique identifier for the asset',
    example: 'ETH',
  })
  @IsString()
  assetSymbol: string;

  @ApiProperty({
    description: 'The target price for the alert',
    example: 2650,
  })
  @IsNumber()
  @Min(0)
  targetPrice: number;

  @ApiProperty({
    description: 'The email address to send alerts to',
    example: 'hyperhire_assignment@hyperhire.in',
  })
  @IsEmail()
  email: string;
}
