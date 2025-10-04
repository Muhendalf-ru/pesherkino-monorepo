import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AdjustBalanceDto {
  @ApiProperty({
    description: 'Amount to change balance (positive or negative)',
    example: 100,
  })
  @IsNumber()
  amount!: number;
}
