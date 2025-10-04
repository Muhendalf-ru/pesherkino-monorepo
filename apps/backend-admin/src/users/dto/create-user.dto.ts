import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Telegram numeric id', example: 123456789 })
  @IsInt()
  telegramId!: number;

  @ApiPropertyOptional({ description: 'Avatar URL' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ description: 'Assigned tariff code' })
  @IsOptional()
  @IsString()
  tariff?: string;

  @ApiPropertyOptional({ description: 'Is admin flag', default: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
