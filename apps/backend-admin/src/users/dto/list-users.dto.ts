import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class ListUsersDto {
  @ApiPropertyOptional({ description: 'Page number', example: 1 })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ description: 'Items per page', example: 20 })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiPropertyOptional({
    description: 'Search text (telegram id or invitedBy or avatarUrl)',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Comma separated tags',
    example: 'vip,trial',
  })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional({ description: 'Filter blocked users (true/false)' })
  @IsOptional()
  @IsString()
  isBlocked?: string;

  @ApiPropertyOptional({ description: 'Filter active users (true/false)' })
  @IsOptional()
  @IsString()
  isActive?: string;
}
