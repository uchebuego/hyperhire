import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsHexadecimal } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({ description: 'Name of the asset', example: 'Ethereum' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Blockchain chain ID', example: '0x1' })
  @IsHexadecimal()
  chainId: string;

  @ApiProperty({
    description: 'Address of the asset',
    example: '0x1234567890abcdef',
  })
  @IsHexadecimal()
  address: string;

  @ApiProperty({ description: 'Symbol of the asset', example: 'ETH' })
  @IsString()
  symbol: string;

  @ApiProperty({
    description: 'Indicates whether to save price history for the asset',
    example: true,
  })
  @IsBoolean()
  refresh: boolean;
}
