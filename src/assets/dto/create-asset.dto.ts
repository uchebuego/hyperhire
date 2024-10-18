import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ description: 'Name of the asset', example: 'Ethereum' })
  name: string;

  @ApiProperty({ description: 'Blockchain chain ID', example: '0x1' })
  chainId: string;

  @ApiProperty({
    description: 'Address of the asset',
    example: '0x1234567890abcdef',
  })
  address: string;

  @ApiProperty({ description: 'Symbol of the asset', example: 'ETH' })
  symbol: string;

  @ApiProperty({
    description: 'Indicates whether to save price history for the asset',
    example: true,
  })
  refresh: boolean;
}
